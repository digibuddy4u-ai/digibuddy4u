import Enquiry from '../models/Enquiry.js';
import Service from '../models/Service.js';
import Portfolio from '../models/Portfolio.js';
import CaseStudy from '../models/CaseStudy.js';

export async function getDashboardOverview(req, res, next) {
  try {
    const [
      totalEnquiries,
      newEnquiries,
      inProgressEnquiries,
      totalServices,
      totalProjects,
      totalCaseStudies,
      recentEnquiries,
    ] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'new' }),
      Enquiry.countDocuments({ status: 'in-progress' }),
      Service.countDocuments(),
      Portfolio.countDocuments(),
      CaseStudy.countDocuments(),
      Enquiry.find().sort({ createdAt: -1 }).limit(5),
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalEnquiries,
          newEnquiries,
          inProgressEnquiries,
          totalServices,
          totalProjects,
          totalCaseStudies,
        },
        recentEnquiries,
      },
    });
  } catch (error) {
    next(error);
  }
}
