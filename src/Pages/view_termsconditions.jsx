import React, { useEffect, useState } from 'react';
import '../CSS/product.css';

const Viewtermsconditions = (props) => {
   
    var data = [
        {   
            id: 1,
            title: "Terms of use",
            description: "Lorem ipsum dolor sit amet consectetur. Elit egestas faucibus porta ipsum  Elit egestas faucibus porta ipsum d...",
        },
        {   
            id: 2,
            title: "Conditions",
            description: "Lorem ipsum dolor sit amet consectetur. Elit egestas faucibus porta ipsum  Elit egestas faucibus porta ipsum d...",
        },
    ];

    // ************************************** Pagination **************************************
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState(data);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    console.log("totalpage",totalPages)

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const getPaginationButtons = () => {
        const buttons = [];
        const maxButtonsToShow = 5;
        
        let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);
        
        // Adjust startPage if we're near the end
        if (endPage - startPage + 1 < maxButtonsToShow) {
            startPage = Math.max(1, endPage - maxButtonsToShow + 1);
        }

        // Add first page if not included
        if (startPage > 1) {
            buttons.push(1);
            if (startPage > 2) buttons.push('...');
        }

        // Add main page numbers
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(i);
        }

        // Add last page if not included
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) buttons.push('...');
            buttons.push(totalPages);
        }
        return buttons;
    };

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    // *******************************************************************************
    
    // Modal
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow1, setModalShow1] = React.useState(false);
    const [modalShow2, setModalShow2] = React.useState(false);

    const [values, setValues] = useState({
        name: "",
        name1: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    // State variables
    let [description, setDescription] = useState("");

    return (
        <>
            <div id='mv_container_fluid'>
                <div className="mv_main_heading mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='mb-1'>View Terms & Conditions</p>
                        <div className='d-flex align-items-center'>
                            <p className='mv_dashboard_heading mb-0'>Dashboard /</p>
                            <p className='mv_dashboard_heading mb-0 ms-1'>Terms & Conditions /</p>
                            <p className='mv_category_heading mv_subcategory_heading mb-0'>View Terms & Conditions</p>
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