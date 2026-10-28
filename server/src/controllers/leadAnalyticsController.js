import LeadActivity from '../models/LeadActivity.js';
import Lead from '../models/Lead.js';
import Enquiry from '../models/Enquiry.js';
import Package from '../models/Package.js';

/**
 * Public / Tracking: Record frontend telemetry event
 */
export async function recordTrackingEvent(req, res) {
  try {
    const {
      eventType,
      packageId,
      packageSlug,
      packageName,
      visitorId,
      referrer,
      landingPage,
      utmSource,
      utmMedium,
      utmCampaign,
      device,
      metadata,
    } = req.body;

    if (!eventType) {
      return res.status(400).json({ success: false, message: 'Event type is required.' });
    }

    const customer = req.customer;
    const isLoggedIn = !!customer;

    const activity = await LeadActivity.create({
      eventType,
      packageId: packageId || null,
      packageSlug: packageSlug || '',
      packageName: packageName || '',
      customerId: customer?._id || null,
      customerEmail: customer?.email || '',
      customerName: customer?.name || '',
      visitorId: visitorId || customer?.anonymousVisitorIds?.[0] || 'anonymous',
      referrer: referrer || '',
      landingPage: landingPage || '',
      utmSource: utmSource || '',
      utmMedium: utmMedium || '',
      utmCampaign: utmCampaign || '',
      device: device || (req.headers['user-agent']?.toLowerCase().includes('mobile') ? 'mobile' : 'desktop'),
      ipAddress: req.ip || '',
      userAgent: req.headers['user-agent'] || '',
      isLoggedIn,
      metadata: metadata || {},
    });

    // Update CRM Lead if customer or lead exists
    const emailToMatch = customer?.email || metadata?.email;
    if (emailToMatch) {
      try {
        await Lead.findOneAndUpdate(
          { email: emailToMatch.toLowerCase() },
          {
            lastActivityDate: new Date(),
            $inc: {
              viewsCount: eventType === 'package_details_view' ? 1 : 0,
              downloadsCount: eventType === 'package_pdf_download' ? 1 : 0,
              enquiriesCount: eventType === 'package_enquiry_submitted' ? 1 : 0,
            },
          }
        );
      } catch (err) {
        // Non-blocking
      }
    }

    res.status(201).json({ success: true, activityId: activity._id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * Public: Submit package-specific enquiry
 */
export async function submitPackageEnquiry(req, res) {
  try {
    const {
      name,
      email,
      phone,
      businessName,
      packageSlug,
      packageName,
      preferredContactMethod,
      message,
      visitorId,
      utmSource,
      utmCampaign,
    } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone, and project message are required.',
      });
    }

    // 1. Create Enquiry record
    const enquiry = await Enquiry.create({
      name,
      email: email.toLowerCase(),
      phone,
      brandName: businessName || '',
      service: packageName ? `Package: ${packageName}` : (packageSlug ? `Package: ${packageSlug}` : 'Package Consultation'),
      message,
      status: 'new',
      source: 'package_enquiry_form',
      ipAddress: req.ip || '',
    });

    // 2. Find package if exists
    let pkg = null;
    if (packageSlug) {
      pkg = await Package.findOne({ slug: packageSlug });
    }

    // 3. Upsert into CRM Lead collection
    let lead = await Lead.findOne({ email: email.toLowerCase() });
    if (!lead) {
      lead = await Lead.create({
        customer: req.customer?._id || null,
        name,
        email: email.toLowerCase(),
        phone,
        businessName: businessName || '',
        preferredPackage: packageName || packageSlug || '',
        preferredPackageId: pkg?._id || null,
        preferredContactMethod: preferredContactMethod || 'whatsapp',
        status: 'New',
        visitorId: visitorId || '',
        source: 'package_enquiry',
        utmSource: utmSource || '',
        utmCampaign: utmCampaign || '',
        firstVisitDate: new Date(),
        lastActivityDate: new Date(),
        enquiriesCount: 1,
        latestEnquiryMessage: message,
      });
    } else {
      lead.name = name;
      lead.phone = phone;
      if (businessName) lead.businessName = businessName;
      if (packageName) lead.preferredPackage = packageName;
      if (pkg) lead.preferredPackageId = pkg._id;
      lead.lastActivityDate = new Date();
      lead.latestEnquiryMessage = message;
      lead.enquiriesCount = (lead.enquiriesCount || 0) + 1;
      if (req.customer) lead.customer = req.customer._id;
      // If was previously lost or not interested, reset to Interested
      if (['Lost', 'Not Interested'].includes(lead.status)) {
        lead.status = 'Interested';
      }
      await lead.save();
    }

    // 4. Record activity event
    try {
      await LeadActivity.create({
        eventType: 'package_enquiry_submitted',
        packageId: pkg?._id,
        packageSlug: packageSlug || '',
        packageName: packageName || '',
        customerId: req.customer?._id,
        customerEmail: email.toLowerCase(),
        customerName: name,
        visitorId: visitorId || 'enquiry_form',
        isLoggedIn: !!req.customer,
        metadata: {
          phone,
          businessName,
          preferredContactMethod,
          enquiryId: enquiry._id,
        },
      });
    } catch (e) {
      // Non-blocking
    }

    res.status(201).json({
      success: true,
      message: 'Your package consultation enquiry has been received. Our senior strategist will review your requirements and reach out promptly.',
      enquiryId: enquiry._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit enquiry.',
    });
  }
}

/**
 * Admin: Get all leads with filters & search
 */
export async function adminGetLeads(req, res) {
  try {
    const { search, status, packageSlug, page = 1, limit = 25 } = req.query;

    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (packageSlug && packageSlug !== 'all') {
      query.preferredPackage = new RegExp(packageSlug, 'i');
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { businessName: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 25;
    const skip = (pageNum - 1) * limitNum;

    const [leads, total] = await Promise.all([
      Lead.find(query)
        .sort({ lastActivityDate: -1, createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate('customer', 'savedPackages downloadedPdfs lastLogin'),
      Lead.countDocuments(query),
    ]);

    // Summary counts for CRM pipeline header
    const statusCounts = await Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const countsMap = {};
    statusCounts.forEach((s) => {
      countsMap[s._id] = s.count;
    });

    res.status(200).json({
      success: true,
      count: leads.length,
      total,
      pages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      statusCounts: countsMap,
      data: leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve CRM leads.',
      error: error.message,
    });
  }
}

/**
 * Admin: Get single lead with full chronological activity timeline
 */
export async function adminGetLeadById(req, res) {
  try {
    const lead = await Lead.findById(req.params.id).populate('customer');
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found.' });
    }

    // Build timeline query: match customerId, email, or visitorId
    const orConditions = [{ customerEmail: lead.email }];
    if (lead.customer) {
      orConditions.push({ customerId: lead.customer._id });
    }
    if (lead.visitorId) {
      orConditions.push({ visitorId: lead.visitorId });
    }

    const timeline = await LeadActivity.find({ $or: orConditions })
      .sort({ createdAt: -1 })
      .limit(100);

    // Also get enquiries
    const enquiries = await Enquiry.find({ email: lead.email })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        lead,
        timeline,
        enquiries,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * Admin: Update lead status & lost reason
 */
export async function adminUpdateLeadStatus(req, res) {
  try {
    const { status, lostReason } = req.body;
    const update = { status };
    if (lostReason !== undefined) update.lostReason = lostReason;
    update.lastActivityDate = new Date();

    const lead = await Lead.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found.' });
    }

    res.status(200).json({
      success: true,
      message: `Lead status updated to ${status}.`,
      data: lead,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

/**
 * Admin: Add private CRM note to lead
 */
export async function adminAddLeadNote(req, res) {
  try {
    const { note } = req.body;
    if (!note || !note.trim()) {
      return res.status(400).json({ success: false, message: 'Note text is required.' });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found.' });
    }

    lead.internalNotes.unshift({
      note: note.trim(),
      author: req.admin?.name || 'Administrator',
      createdAt: new Date(),
    });
    lead.lastActivityDate = new Date();
    await lead.save();

    res.status(200).json({
      success: true,
      message: 'Note added to CRM lead file.',
      data: lead.internalNotes,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

/**
 * Admin: Assign lead to staff member and set follow-up date
 */
export async function adminAssignLead(req, res) {
  try {
    const { assignedTo, followUpDate } = req.body;
    const update = {};
    if (assignedTo !== undefined) update.assignedTo = assignedTo;
    if (followUpDate !== undefined) update.followUpDate = followUpDate ? new Date(followUpDate) : null;
    update.lastActivityDate = new Date();

    const lead = await Lead.findByIdAndUpdate(req.params.id, update, { new: true });
    res.status(200).json({
      success: true,
      message: 'Lead assignment updated.',
      data: lead,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

/**
 * Admin: Export leads to CSV
 */
export async function adminExportLeadsCSV(req, res) {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    const header = 'Name,Email,Phone,Business,Package,Status,AssignedTo,FollowUpDate,Enquiries,Created\n';
    const rows = leads.map((l) => {
      const clean = (val) => `"${(val || '').toString().replace(/"/g, '""')}"`;
      return [
        clean(l.name),
        clean(l.email),
        clean(l.phone),
        clean(l.businessName),
        clean(l.preferredPackage),
        clean(l.status),
        clean(l.assignedTo),
        clean(l.followUpDate ? l.followUpDate.toISOString().split('T')[0] : ''),
        l.enquiriesCount || 0,
        l.createdAt ? l.createdAt.toISOString().split('T')[0] : '',
      ].join(',');
    }).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="DigiBuddy4U_Leads_Export.csv"');
    res.send(header + rows);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * Admin: Aggregated Package & Lead Analytics
 */
export async function adminGetPackageAnalytics(req, res) {
  try {
    const { range = '30d' } = req.query;

    let startDate = new Date();
    if (range === '7d') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (range === '90d') {
      startDate.setDate(startDate.getDate() - 90);
    } else if (range === 'all') {
      startDate = new Date(0);
    } else {
      // 30 days default
      startDate.setDate(startDate.getDate() - 30);
    }

    const dateFilter = { createdAt: { $gte: startDate } };

    // 1. Funnel event counts
    const eventCountsRaw = await LeadActivity.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$eventType', count: { $sum: 1 } } },
    ]);

    const eventCounts = {};
    eventCountsRaw.forEach((e) => {
      eventCounts[e._id] = e.count;
    });

    // 2. Package-wise breakdown
    const packageStats = await LeadActivity.aggregate([
      {
        $match: {
          ...dateFilter,
          packageSlug: { $ne: '', $exists: true },
        },
      },
      {
        $group: {
          _id: { packageSlug: '$packageSlug', eventType: '$eventType' },
          count: { $sum: 1 },
        },
      },
    ]);

    const packageBreakdown = {};
    packageStats.forEach((p) => {
      const slug = p._id.packageSlug;
      const event = p._id.eventType;
      if (!packageBreakdown[slug]) {
        packageBreakdown[slug] = {
          slug,
          cardViews: 0,
          detailsViews: 0,
          pdfDownloads: 0,
          savedCount: 0,
          enquiries: 0,
        };
      }
      if (event === 'package_card_view') packageBreakdown[slug].cardViews += p.count;
      if (event === 'package_details_view') packageBreakdown[slug].detailsViews += p.count;
      if (event === 'package_pdf_download') packageBreakdown[slug].pdfDownloads += p.count;
      if (event === 'package_saved') packageBreakdown[slug].savedCount += p.count;
      if (event === 'package_enquiry_submitted') packageBreakdown[slug].enquiries += p.count;
    });

    // 3. Lead status distribution
    const leadStatuses = await Lead.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const statusDist = {};
    leadStatuses.forEach((s) => {
      statusDist[s._id] = s.count;
    });

    // 4. Totals for conversion calculation
    const totalLeads = await Lead.countDocuments(dateFilter);
    const wonLeads = statusDist['Won'] || 0;
    const totalEnquiries = eventCounts['package_enquiry_submitted'] || 0;
    const totalDetailsViews = eventCounts['package_details_view'] || 0;
    const totalDownloads = eventCounts['package_pdf_download'] || 0;

    const conversionRate = totalDetailsViews > 0
      ? ((totalEnquiries / totalDetailsViews) * 100).toFixed(1)
      : '0.0';

    const leadToWinRate = totalLeads > 0
      ? ((wonLeads / totalLeads) * 100).toFixed(1)
      : '0.0';

    res.status(200).json({
      success: true,
      range,
      startDate,
      funnel: {
        cardViews: eventCounts['package_card_view'] || 0,
        detailsClicks: eventCounts['package_details_click'] || 0,
        loginPrompts: eventCounts['login_prompt_shown'] || 0,
        signups: eventCounts['signup_completed'] || 0,
        logins: eventCounts['login_completed'] || 0,
        detailsViews: totalDetailsViews,
        pdfDownloads: totalDownloads,
        savedPackages: eventCounts['package_saved'] || 0,
        enquiriesSubmitted: totalEnquiries,
        totalLeads,
        wonLeads,
      },
      conversions: {
        viewToEnquiryRate: `${conversionRate}%`,
        leadToWinRate: `${leadToWinRate}%`,
      },
      packageBreakdown: Object.values(packageBreakdown),
      leadStatusDistribution: statusDist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to aggregate package analytics.',
      error: error.message,
    });
  }
}
