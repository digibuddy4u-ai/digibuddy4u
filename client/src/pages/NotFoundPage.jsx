import React from 'react';
import { Home, ArrowLeft, Search } from 'lucide-react';
import SEO from '../components/common/SEO';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="404 — Page Not Found"
        description="The page you are looking for does not exist or has been relocated."
      />

      <section className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-surface-light">
        <div className="max-w-md w-full text-center space-y-6">
          <Badge variant="yellow" size="md">
            Error 404
          </Badge>

          <h1 className="text-6xl sm:text-7xl font-heading font-black text-navy-900 tracking-tight">
            404
          </h1>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-navy-900">
              Page Not Found
            </h2>
            <p className="text-sm text-content-muted leading-relaxed">
              We couldn’t find the page you were looking for. It might have been moved, renamed, or never existed.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              to="/"
              variant="primary"
              size="md"
              icon={Home}
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Back to Home
            </Button>
            <Button
              to="/services"
              variant="secondary"
              size="md"
              className="w-full sm:w-auto"
            >
              Browse Services
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
