const Section = ({ id, children, className = "", maxWidth }) => (
    <section id={id} className={`py-24 border-t border-gray-700 ${className} opacity-100 animate-in fade-in duration-700`}>
        <div className={`container max-w-7xl mx-auto ${maxWidth ?? ""}`}>
            {children}
        </div>
    </section>
);

export default Section;