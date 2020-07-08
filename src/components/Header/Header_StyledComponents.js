import styled from 'styled-components/native';
import css from 'styled-css/native';

let HeaderContainerView = styled.View`
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
`;

let PortalLogoImage = styled.Image.attrs( (props) => {
  
})`
    width: 130;
    height: 130;

    margin-top: 5;
`;

let UpdateAppView = styled.View`
    background-color: "#F4F7F9";
    margin-bottom: 12;
`; 

let UpdateTextDescription = styled.Text`
    font-size: 16; 
    padding-left: 8;
    padding-right: 8;
    align-self: "center";
    color: "#15516b";
`;

let UserInfoText = styled.Text`
    color: ${props => (props.title === "Student" || props.renderAsStudent) ? "#B41A1F" : "#1E6C93" };
    
    font-weight: ${props => props.bold ? "bold" : "normal"};
    font-style: ${props => props.italic ? "italic" : "normal"};

    margin-top: 0;

    align-self: center;

    margin-top: 5;
`;


export { HeaderContainerView, PortalLogoImage, UpdateAppView, UpdateTextDescription, UserInfoText }; 