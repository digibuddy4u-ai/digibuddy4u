import {
  Film,
  Video,
  UserCheck,
  User,
  Award,
  Layers,
  PenTool,
  FileText,
  Camera,
  Scissors,
  Lightbulb,
  MessageSquare,
  Hash,
  Calendar,
  Search,
  Globe,
  MapPin,
  MessageCircle,
  Share2,
  Target,
  BarChart3,
  Palette,
  Compass,
  Check,
} from 'lucide-react';

/**
 * Returns a specific miniature Lucide icon component and color styling
 * based on the deliverable item text so users can recognize each item visually.
 */
export function getDeliverableIcon(text = '') {
  const lower = text.toLowerCase();

  // Specific talent / reels types first
  if (lower.includes('model')) {
    return {
      icon: UserCheck,
      badgeClass: 'bg-blue-50 text-blue-600 border border-blue-200/70',
      solidBadgeClass: 'bg-blue-600 text-white',
    };
  }
  if (lower.includes('founder')) {
    return {
      icon: User,
      badgeClass: 'bg-indigo-50 text-indigo-600 border border-indigo-200/70',
      solidBadgeClass: 'bg-indigo-600 text-white',
    };
  }
  if (lower.includes('influencer')) {
    return {
      icon: Award,
      badgeClass: 'bg-amber-50 text-amber-600 border border-amber-200/70',
      solidBadgeClass: 'bg-amber-500 text-white',
    };
  }
  if (lower.includes('edit') || lower.includes('editing') || lower.includes('color grading')) {
    return {
      icon: Scissors,
      badgeClass: 'bg-rose-50 text-rose-600 border border-rose-200/70',
      solidBadgeClass: 'bg-rose-600 text-white',
    };
  }
  if (lower.includes('script')) {
    return {
      icon: PenTool,
      badgeClass: 'bg-purple-50 text-purple-600 border border-purple-200/70',
      solidBadgeClass: 'bg-purple-600 text-white',
    };
  }
  if (lower.includes('shoot') || lower.includes('camera') || lower.includes('direction')) {
    return {
      icon: Camera,
      badgeClass: 'bg-cyan-50 text-cyan-700 border border-cyan-200/70',
      solidBadgeClass: 'bg-cyan-600 text-white',
    };
  }
  if (lower.includes('concept') || lower.includes('storyboard')) {
    return {
      icon: Lightbulb,
      badgeClass: 'bg-amber-50 text-amber-600 border border-amber-200/70',
      solidBadgeClass: 'bg-amber-500 text-white',
    };
  }
  if (lower.includes('reel')) {
    return {
      icon: Film,
      badgeClass: 'bg-violet-50 text-violet-600 border border-violet-200/70',
      solidBadgeClass: 'bg-violet-600 text-white',
    };
  }
  if (lower.includes('website')) {
    return {
      icon: Globe,
      badgeClass: 'bg-cyan-50 text-cyan-700 border border-cyan-200/70',
      solidBadgeClass: 'bg-cyan-600 text-white',
    };
  }
  if (lower.includes('google') || lower.includes('gbp')) {
    return {
      icon: MapPin,
      badgeClass: 'bg-emerald-50 text-emerald-600 border border-emerald-200/70',
      solidBadgeClass: 'bg-emerald-600 text-white',
    };
  }
  if (lower.includes('whatsapp')) {
    return {
      icon: MessageCircle,
      badgeClass: 'bg-green-50 text-green-600 border border-green-200/70',
      solidBadgeClass: 'bg-green-600 text-white',
    };
  }
  if (lower.includes('meta ads') || lower.includes('ads campaign')) {
    return {
      icon: Target,
      badgeClass: 'bg-orange-50 text-orange-600 border border-orange-200/70',
      solidBadgeClass: 'bg-orange-600 text-white',
    };
  }
  if (lower.includes('instagram') || lower.includes('facebook') || lower.includes('linkedin')) {
    return {
      icon: Share2,
      badgeClass: 'bg-sky-50 text-sky-600 border border-sky-200/70',
      solidBadgeClass: 'bg-sky-600 text-white',
    };
  }
  if (lower.includes('post') || lower.includes('carousel') || lower.includes('meme')) {
    return {
      icon: Layers,
      badgeClass: 'bg-blue-50 text-blue-600 border border-blue-200/70',
      solidBadgeClass: 'bg-blue-600 text-white',
    };
  }
  if (lower.includes('content writing') || lower.includes('copywriting')) {
    return {
      icon: FileText,
      badgeClass: 'bg-teal-50 text-teal-600 border border-teal-200/70',
      solidBadgeClass: 'bg-teal-600 text-white',
    };
  }
  if (lower.includes('caption')) {
    return {
      icon: MessageSquare,
      badgeClass: 'bg-sky-50 text-sky-600 border border-sky-200/70',
      solidBadgeClass: 'bg-sky-600 text-white',
    };
  }
  if (lower.includes('hashtag')) {
    return {
      icon: Hash,
      badgeClass: 'bg-pink-50 text-pink-600 border border-pink-200/70',
      solidBadgeClass: 'bg-pink-600 text-white',
    };
  }
  if (lower.includes('calendar') || lower.includes('schedule') || lower.includes('scheduling')) {
    return {
      icon: Calendar,
      badgeClass: 'bg-blue-50 text-blue-600 border border-blue-200/70',
      solidBadgeClass: 'bg-blue-600 text-white',
    };
  }
  if (lower.includes('branding') || lower.includes('profile optimization') || lower.includes('bio')) {
    return {
      icon: Palette,
      badgeClass: 'bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-200/70',
      solidBadgeClass: 'bg-fuchsia-600 text-white',
    };
  }
  if (lower.includes('audit')) {
    return {
      icon: Search,
      badgeClass: 'bg-slate-100 text-slate-700 border border-slate-200',
      solidBadgeClass: 'bg-slate-700 text-white',
    };
  }
  if (lower.includes('reporting') || lower.includes('optimization') || lower.includes('analytics')) {
    return {
      icon: BarChart3,
      badgeClass: 'bg-emerald-50 text-emerald-600 border border-emerald-200/70',
      solidBadgeClass: 'bg-emerald-600 text-white',
    };
  }
  if (lower.includes('guidance') || lower.includes('consultation') || lower.includes('positioning') || lower.includes('presentation')) {
    return {
      icon: Compass,
      badgeClass: 'bg-cyan-50 text-cyan-700 border border-cyan-200/70',
      solidBadgeClass: 'bg-cyan-600 text-white',
    };
  }

  return {
    icon: Check,
    badgeClass: 'bg-primary/10 text-primary border border-primary/20',
    solidBadgeClass: 'bg-primary text-white',
  };
}
