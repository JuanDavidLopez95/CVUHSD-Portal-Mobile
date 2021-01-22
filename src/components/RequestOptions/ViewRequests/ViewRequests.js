import React, { useState } from 'react';

import RequestPreview from './RequestPreview/RequestPreview.js';

//Import styled components
import { Container, RequestTypeTitle, RequestPreviewContainer } from './ViewRequestsStyledComponents.js';

/**
 * React functional component to house the screen to view all the requests
 * @param { Object } navigation  object passed from React Navigation's Navigation Container. Houses methods to navigate across the different streams.
 * @param { string } districtPosition the role of the school district user
 * @param { boolean } renderAsStudent dictates whether a staff member is choosing to view the app through a student's eyes
 */

const isDev = __DEV__;

const ViewRequests = ({navigation, districtPosition, renderAsStudent}) => {
    let [ isLoading, setIsLoading ] = useState(false);

    const getUserRequests = async (email, requestsType = "All") => {
        let requests = [];
        setIsLoading(true);

        const getUserRequests_URL = `${isDev ? "" : "/server"}/helpdesk/request/read/all/user`;
        const getUserRequests_Headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials": true
        };
    
        let requestsResponse = await fetch(getUserRequests_URL, {
            method: 'POST',
            headers: getUserRequests_Headers,
            body: JSON.stringify({ email, requestsType } )
        })
        .then((serverResponse) => serverResponse.json()) //Parse the JSON of the response
        .then((jsonResponse) => jsonResponse)
        .catch((error) => {
            console.error(`Catching error:\t ${error}`);
        });

        if (requestsResponse && !requestsResponse.error) {
            requests = requestsResponse.requests;
            setIsLoading(false);
        } else {
            console.log(`Error in fetching the requests.`);

            requests = [];
        }

        return requests;
    }; //end getUserRequests

    return (
        <Container>
            <RequestTypeTitle
              districtPosition    =   { districtPosition } 
              renderAsStudent     =   { renderAsStudent }
            >
                All Requests
            </RequestTypeTitle>

            <RequestPreviewContainer>
                <RequestPreview
                    navigation          =   { navigation }
                    districtPosition    =   { districtPosition } 
                    renderAsStudent     =   { renderAsStudent }
                />
                 


            </RequestPreviewContainer>
        </Container>
    ); //end return
}; //end ViewRequests

export default ViewRequests;