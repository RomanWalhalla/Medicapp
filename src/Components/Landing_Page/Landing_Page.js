import "./Landing_Page.css"

const Landing_Page = () => {
    return (
        <>
        <div className="content">
            <div className="container">
                <div className="content_text">
                    <h1 className="your_health">Your Health</h1>
                    <h1 className="our_responsibility">Our Responsibility</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam quaerat, consequatur architecto dolores eveniet quod aliquam dolorem error nam rem fugiat ipsam quis nostrum iusto explicabo officia corrupti enim voluptatibus nemo adipisci nihil iste laboriosam vel odio? Ea, mollitia fugit! Corrupti ipsa excepturi eos pariatur quod sit, dolor consectetur adipisci qui cupiditate fugit quibusdam placeat deleniti itaque ea vitae rerum similique repellat quo! Voluptatibus atque nobis culpa aspernatur. Dolores porro quidem culpa beatae accusantium itaque magni, assumenda consequuntur ducimus nostrum dolorum? Ullam, maxime magni odit cumque nihil blanditiis distinctio molestias repudiandae quam incidunt architecto cum enim exercitationem id consequuntur error aliquid dicta libero saepe culpa laudantium non illum eveniet.</p>
                    <button onclick="document.location='./Menu.html'" className="btn_get_started">Get Started</button>
                </div>
            </div>
        </div>
        </>
        );
}

export default Landing_Page;