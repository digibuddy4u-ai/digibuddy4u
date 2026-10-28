import Setting from '../models/Setting.js';

export async function getPublicSettings(req, res, next) {
  try {
    let setting = await Setting.findOne();
    if (!setting) {
      setting = await Setting.create({});
    }

    res.status(200).json({
      success: true,
      data: {
        businessName: setting.businessName,
        tagline: setting.tagline,
        email: setting.email,
        phone: setting.phone,
        whatsappNumber: setting.whatsappNumber,
        whatsappUrl: setting.whatsappUrl,
        address: setting.address,
        socials: setting.socials,
        footerBio: setting.footerBio,
        showFaqs: setting.showFaqs !== false,
        servicesSettings: setting.servicesSettings,
        faqSettings: setting.faqSettings,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getAdminSettings(req, res, next) {
  try {
    let setting = await Setting.findOne();
    if (!setting) {
      setting = await Setting.create({});
    }
    res.status(200).json({ success: true, data: setting });
  } catch (error) {
    next(error);
  }
}

export async function updateSettings(req, res, next) {
  try {
    let setting = await Setting.findOne();
    if (!setting) {
      setting = new Setting();
    }

    const {
      businessName,
      tagline,
      email,
      phone,
      whatsappNumber,
      whatsappUrl,
      address,
      socials,
      footerBio,
      showFaqs,
      faqSettings,
      servicesSettings,
    } = req.body;

    if (businessName !== undefined) setting.businessName = businessName.trim();
    if (tagline !== undefined) setting.tagline = tagline.trim();
    if (email !== undefined) setting.email = email.trim();
    if (phone !== undefined) setting.phone = phone.trim();
    if (whatsappNumber !== undefined) setting.whatsappNumber = whatsappNumber.trim();
    if (whatsappUrl !== undefined) setting.whatsappUrl = whatsappUrl.trim();
    if (address !== undefined) setting.address = address.trim();
    if (footerBio !== undefined) setting.footerBio = footerBio.trim();
    if (showFaqs !== undefined) setting.showFaqs = Boolean(showFaqs);
    if (faqSettings !== undefined && typeof faqSettings === 'object') {
      setting.faqSettings = { ...setting.faqSettings, ...faqSettings };
    }
    if (servicesSettings !== undefined && typeof servicesSettings === 'object') {
      setting.servicesSettings = { ...setting.servicesSettings, ...servicesSettings };
    }

    if (socials && typeof socials === 'object') {
      setting.socials = {
        ...setting.socials,
        ...socials,
      };
    }

    await setting.save();

    res.status(200).json({
      success: true,
      message: 'Website settings updated successfully.',
      data: setting,
    });
  } catch (error) {
    next(error);
  }
}
