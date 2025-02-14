import React, { useEffect, useState } from 'react';
import '../CSS/product.css';

const Viewtermsconditions = (props) => {

    return (
        <>
            <div id='mv_container_fluid'>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>View Terms & Conditions</p>
                        <div className='d-flex align-items-center mv_view_term_and_con'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_dashboard_heading mv_term_condi_heading mb-0 ms-1'>Terms & Conditions /</p>
                            <p className='mv_category_heading mv_subcategory_heading mv_view_term_heading mb-0'>View Terms & Conditions</p>
                        </div>
                    </div>
                </div>
                <div className='mv_main_view_terms_conditions'>
                    <div>
                        <p className='mv_terms_of_heading'>Terms of Use</p>
                        <ul>
                            <li className='mv_privacy_policy_text mb-2'>Lorem ipsum dolor sit amet consectetur. Eget congue volutpat sed orci dolor libero. Donec suspendisse mus id nibh eget. Sit feugiat risus mauris nisl. Vitae pulvinar aliquam nunc mauris vehicula pretium. Nunc ipsum nisl integer convallis a quis nec donec ornare. Diam tincidunt elit mi nulla senectus quisque in amet.</li>
                            <li className='mv_privacy_policy_text mb-2'>Turpis sit dictum id blandit. Ultrices dolor dui viverra magna malesuada laoreet. Ornare amet aliquam imperdiet neque donec. Etiam nisl viverra massa nunc eget fames ullamcorper. Erat vivamus nisl molestie tincidunt cras lacus turpis. Arcu tellus nullam feugiat fermentum venenatis ultricies nec sagittis. Lorem cursus viverra gravida vitae morbi etiam leo nisl mollis.</li>
                            <li className='mv_privacy_policy_text mb-2'>Mattis magnis sit scelerisque consequat vestibulum. Parturient non ornare quis ornare. Mauris purus risus egestas tortor. Eget orci fames nisi at blandit vitae nibh. </li>
                            <li className='mv_privacy_policy_text mb-2'>Gravida viverra erat aliquam vitae mattis in duis magna. Morbi senectus adipiscing nisi aliquam amet. Porttitor mattis nunc turpis sit in sagittis ornare in egestas. Urna fringilla nibh tincidunt aliquet facilisis eget faucibus. Turpis integer leo aliquet lectus nunc euismod in vitae. Egestas arcu nisl elit eu amet non in faucibus nibh. Ut donec parturient in mauris. Risus sed ac pulvinar arcu ut accumsan amet semper.</li>
                            <li className='mv_privacy_policy_text mb-2'>Eget sit bibendum egestas egestas pharetra volutpat penatibus. Adipiscing sit integer sapien mauris pellentesque amet. Nisi bibendum amet elementum amet sit diam placerat lacus. Gravida augue facilisis condimentum parturient aliquam odio facilisis quis. Egestas quisque urna sagittis in risus praesent mauris faucibus nisi. Tincidunt vestibulum morbi libero id volutpat proin vestibulum dolor. Pharetra cursus ullamcorper nunc nisl quis volutpat eget porta ultricies. Ut tellus imperdiet non amet.</li>
                            <li className='mv_privacy_policy_text mb-2'>Odio fringilla cursus ante arcu pulvinar. Nec urna penatibus elementum sed. Sed consequat ullamcorper nibh nibh ullamcorper luctus id convallis. Vulputate est cras arcu sed neque. Nibh pellentesque enim proin adipiscing id nullam. Facilisis egestas nulla quam fermentum nulla nec in vulputate. Non elementum nascetur gravida auctor eget facilisis tortor. Lacinia elit sit platea turpis eu leo est. Condimentum vestibulum pharetra eu sed. Mi nisl enim fermentum lacus. Amet orci diam aliquam id. At vitae laoreet ac tortor nulla volutpat facilisis nunc purus. Quam scelerisque vitae nunc luctus ac neque id.</li>
                            <li className='mv_privacy_policy_text mb-2'>Aliquam feugiat rhoncus mauris leo dui pretium. Quisque sed amet nunc nisl venenatis mi aenean consequat. Rhoncus turpis pellentesque nulla dictum aenean neque. Proin id in lorem eget. Vel nulla etiam at placerat netus pretium cras dapibus. Imperdiet felis suscipit tellus duis lacus lacus ullamcorper. Nisl amet neque congue arcu. Non pretium id nam leo eu ultrices id. Sagittis elementum leo cursus integer. Ultrices magna metus amet id nibh.</li>
                        </ul>
                    </div>
                    <div>
                        <p className='mv_terms_of_heading'>Conditions</p>
                        <ul className='mb-0'>
                            <li className='mv_privacy_policy_text mb-2'>Lorem ipsum dolor sit amet consectetur. Eget congue volutpat sed orci dolor libero. Donec suspendisse mus id nibh eget. Sit feugiat risus mauris nisl. Vitae pulvinar aliquam nunc mauris vehicula pretium. Nunc ipsum nisl integer convallis a quis nec donec ornare. Diam tincidunt elit mi nulla senectus quisque in amet. </li>
                            <li className='mv_privacy_policy_text mb-2'>Turpis sit dictum id blandit. Ultrices dolor dui viverra magna malesuada laoreet. Ornare amet aliquam imperdiet neque donec. Etiam nisl viverra massa nunc eget fames ullamcorper. Erat vivamus nisl molestie tincidunt cras lacus turpis. Arcu tellus nullam feugiat fermentum venenatis ultricies nec sagittis. Lorem cursus viverra gravida vitae morbi etiam leo nisl mollis.</li>
                            <li className='mv_privacy_policy_text mb-2'>Mattis magnis sit scelerisque consequat vestibulum. Parturient non ornare quis ornare. Mauris purus risus egestas tortor. Eget orci fames nisi at blandit vitae nibh. </li>
                            <li className='mv_privacy_policy_text mb-2'>Gravida viverra erat aliquam vitae mattis in duis magna. Morbi senectus adipiscing nisi aliquam amet. Porttitor mattis nunc turpis sit in sagittis ornare in egestas. Urna fringilla nibh tincidunt aliquet facilisis eget faucibus. Turpis integer leo aliquet lectus nunc euismod in vitae. Egestas arcu nisl elit eu amet non in faucibus nibh. Ut donec parturient in mauris. Risus sed ac pulvinar arcu ut accumsan amet semper.</li>
                            <li className='mv_privacy_policy_text mb-2'>Eget sit bibendum egestas egestas pharetra volutpat penatibus. Adipiscing sit integer sapien mauris pellentesque amet. Nisi bibendum amet elementum amet sit diam placerat lacus. Gravida augue facilisis condimentum parturient aliquam odio facilisis quis. Egestas quisque urna sagittis in risus praesent mauris faucibus nisi. Tincidunt vestibulum morbi libero id volutpat proin vestibulum dolor. Pharetra cursus ullamcorper nunc nisl quis volutpat eget porta ultricies. Ut tellus imperdiet non amet.</li>
                            <li className='mv_privacy_policy_text mb-0'>Odio fringilla cursus ante arcu pulvinar. Nec urna penatibus elementum sed. Sed consequat ullamcorper nibh nibh ullamcorper luctus id convallis. Vulputate est cras arcu sed neque. Nibh pellentesque enim proin adipiscing id nullam.</li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Viewtermsconditions