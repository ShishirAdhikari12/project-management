export default function ApplicationLogo(props) {
  return (
    <>
      <div className="lg:flex lg:items-center hidden">
        {/* Light theme logo */}
        <img
          src="/images/light-logo.svg"
          alt="TaskFlow"
          className="h-16 w-auto dark:hidden"
        />

        {/* Dark theme logo */}
        <img
          src="/images/dark-logo.svg"
          alt="TaskFlow"
          className="hidden h-16 w-auto dark:block"
        />
      </div>
      <div className="flex items-center lg:hidden">
        {/* small logo */}
        <img
          src="/images/small-logo.svg"
          alt="TaskFlow"
          className="h-16 w-auto"
        />
      </div>
    </>
  );
}
