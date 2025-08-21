interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}

const PageHeader = ({ title, subtitle, breadcrumb }: PageHeaderProps) => {
  return (
    <div className="pt-16 pb-12 text-center">
      {breadcrumb && (
        <div className="text-sm text-muted-foreground mb-4 alpha-gradient-text tracking-wide">
          Home / {breadcrumb}
        </div>
      )}
      <h1 className="text-3xl md:text-4xl lg:text-5xl alpha-heading alpha-gradient-text mb-6">
        {title}
      </h1>
      <div className="alpha-section-divider mb-6"></div>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed alpha-subheading">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;