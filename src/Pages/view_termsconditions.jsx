import React, { useEffect, useState } from 'react';
import '../CSS/product.css';
import axios from 'axios';

const Viewtermsconditions = () => {
    const [termsData, setTermsData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const BaseUrl = process.env.REACT_APP_BASEURL;
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTermsData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${BaseUrl}/api/allTerms`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                // console.log("Terms data fetched:", response?.data);
                setTermsData(response?.data?.terms || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching terms data:", error);
                setLoading(false);
            }
        };
        
        fetchTermsData();
    }, [BaseUrl, token]);

    // Group terms by title category
    const groupedTerms = termsData.reduce((acc, term) => {
        if (!acc["Terms of Use"]) acc["Terms of Use"] = [];
        if (!acc["Conditions"]) acc["Conditions"] = [];
        
        const lowerTitle = term.title.toLowerCase();
        if (lowerTitle.includes("term")) {
            acc["Terms of Use"].push(term);
        } else if (lowerTitle.includes("condition")) {
            acc["Conditions"].push(term);
        } else {
            acc["Terms of Use"].push(term);
        }
        
        return acc;
    }, {});

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
                
                {loading ? (
                    <div className='mv_main_view_terms_conditions'>
                        <p>Loading terms and conditions...</p>
                    </div>
                ) : (
                    <div className='mv_main_view_terms_conditions'>
                        {/* Terms of Use Section */}
                        <div>
                            <p className='mv_terms_of_heading'>Terms of Use</p>
                            <ul>
                                {groupedTerms["Terms of Use"] && groupedTerms["Terms of Use"].length > 0 ? (
                                    groupedTerms["Terms of Use"].map((term, descIndex) => (
                                        <li key={`terms-${descIndex}`} className='mv_privacy_policy_text mb-3'>
                                            <p className='mv_term_title'>{term.title}</p>
                                        </li>
                                    ))
                                ) : (
                                    <li className='mv_privacy_policy_text mb-3'>
                                        No terms of use available. Please add them from the Terms & Conditions page.
                                    </li>
                                )}
                            </ul>
                        </div>

                        
                        {/* Conditions Section */}
                        <div>
                            <p className='mv_terms_of_heading'>Conditions</p>
                            <ul className='mb-0'>
                                {groupedTerms["Conditions"] && groupedTerms["Conditions"].length > 0 ? (
                                    groupedTerms["Conditions"].map((term, descIndex) => (
                                        <li key={`conditions-${descIndex}`} className='mv_privacy_policy_text mb-3'>
                                            <p className='mv_condition_title'><strong>{term.title}</strong></p>
                                            <p className='mv_condition_description'>{term.description}</p>
                                        </li>
                                    ))
                                ) : (
                                    // If no title available, show description only
                                    termsData.length > 0 ? (
                                        termsData.map((term, descIndex) => (
                                            <li key={`all-conditions-${descIndex}`} className='mv_privacy_policy_text mb-3'>
                                                <p className='mv_condition_description'>{term.description}</p>
                                            </li>
                                        ))
                                    ) : null
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Viewtermsconditions;