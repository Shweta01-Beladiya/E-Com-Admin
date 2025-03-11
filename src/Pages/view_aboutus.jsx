import '../CSS/product.css';

const Viewaboutus = (props) => {

    return (
        <>
            <div id='mv_container_fluid'>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>View About Us</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_dashboard_heading mb-0 ms-1'>About Us /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>View About Us</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='mv_main_view_terms_conditions mb-3'>
                        <div className='row mv_main_quickcart'>
                            <div className="col-md-6 align-content-center">
                                <p className='mv_quickcart_heading'>The Quickcart Group</p>
                                <p className='mv_quickcart_text'>Lorem ipsum dolor sit amet consectetur. Massa facilisis scelerisque iaculis habitant congue est blandit amet. Tortor in vulputate nulla vitae quam.Lorem ipsum dolor sit amet consectetur. Massa facilisis scelerisque.</p>
                                <p className='mv_quickcart_text mb-0'>Lorem ipsum dolor sit amet consectetur. Massa facilisis scelerisque iaculis habitant congue est blandit amet. Tortor in vulputate nulla vitae quam.Lorem ipsum dolor sit amet consectetur. Massa facilisis scelerisque.</p>
                            </div>
                            <div className="col-md-6 align-content-center">
                                <img className='mv_quickcart_img w-100' src={require(`../mv_img/quickcart_group.png`)} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className='mv_main_view_terms_conditions'>
                        <div className='row'>
                            <div className="col-md-6 align-content-center">
                                <img className='mv_quickcart_img w-100' src={require(`../mv_img/ethics_compliance.png`)} alt="" />
                            </div>
                            <div className="col-md-6 align-content-center">
                                <p className='mv_quickcart_heading'>Ethics & Compliance</p>
                                <p className='mv_quickcart_text'>Lorem ipsum dolor sit amet consectetur. Massa facilisis scelerisque iaculis habitant congue est blandit amet. Tortor in vulputate nulla vitae quam.Lorem ipsum dolor sit amet consectetur. Massa facilisis scelerisque.</p>
                                <p className='mv_quickcart_text mb-0'>Lorem ipsum dolor sit amet consectetur. Massa facilisis scelerisque iaculis habitant congue est blandit amet. Tortor in vulputate nulla vitae quam.Lorem ipsum dolor sit amet consectetur. Massa facilisis scelerisque.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Viewaboutus