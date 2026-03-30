const Section = ({ id, children, className = "", maxWidth }) => (
    <section id={id} className={`py-24 border-t border-border/40 ${className}`}>
        <div className={`container ${maxWidth ?? ""}`}>
            {children}
        </div>
    </section>
);

export default Section;