import React, { forwardRef, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

import { InputContainer, LabelText, TextInputStyled, Select, ErrorText, ErrorTextItalicalized, DownArrow } from './InputStyledComponents.js';

const Input = forwardRef((props, ref) => {
        const { appWidth, districtPosition, renderAsStudent, usePicker, pickerPlaceHolder, label, labelStyle, items, error, name, onSubmitEditing, onChangeText, noOuterLabel, theme, placeholder, placeHolderText, mode, getValues,...inputProps } = props;

        const [ labelVisible, setLabelVisible ] = useState(label);
        const [ isFocused, setIsFocused ]   = useState(false);

        const pickerSelectStyle = StyleSheet.create({
            placeholder: {
                color:  districtPosition ?
                            ( (districtPosition === "student") || renderAsStudent === true) ? 
                                " rgba(147, 30, 29, 0.6)": "rgba(30, 108, 147, 0.6)"
                            : "rgba(147, 30, 29, 0.6)",
            },
            inputIOS: {
                position: "relative",
                // display: "flex",
                // flexDirection: "row",
                // justifyContent: "center",
                width: (appWidth * 0.9),
                fontSize: 16,
                marginTop: 6,
                marginBottom: 0,
                marginLeft:  "auto",
                marginRight: "auto",
                paddingVertical: 10,
                paddingHorizontal: 10,
                paddingRight: 30, // to ensure the text is never behind the icon

                borderWidth: 1,
                borderColor:  districtPosition ?
                                ( (districtPosition === "student") || renderAsStudent === true) ? 
                                    " rgba(147, 30, 29, 0.5)": "rgba(30, 108, 147, 0.5)"
                                : "rgba(147, 30, 29, 0.5)",
                borderRadius: 10,
                backgroundColor: '#F6F6F6',
                color: ( (districtPosition.toLowerCase() === "student") || (renderAsStudent === true) ) ? "#B41A1F" : "#1E6C93",
            },
            inputAndroid: {
                position: "relative",
                width: (appWidth * 0.9),
                fontSize: 16,
                marginTop: 3,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor:  districtPosition ?
                                ( (districtPosition === "student") || renderAsStudent === true) ? 
                                    " rgba(147, 30, 29, 0.5)": "rgba(30, 108, 147, 0.5)"
                                : "rgba(147, 30, 29, 0.5)",
                borderRadius: 10,
                backgroundColor: '#F6F6F6',
                color: ( (districtPosition === "Student") || (renderAsStudent === true) ) ? "#B41A1F" : "#1E6C93",
                paddingRight: 30, // to ensure the text is never behind the icon
            },
            iconContainer: {
                position: 'absolute',
                left: (Platform.OS === "ios") ? "85%" : "90%",
                color: ( (districtPosition === "Student") || (renderAsStudent === true) ) ? "#B41A1F" : "#1E6C93",
                top: 20
            }
          });

        const onFocus = () => { 
            setIsFocused(true);
            setLabelVisible(false); 
            
            return;
        }; //end onFocus()
    
        const onBlur = () => { 
            setIsFocused(false);
            setLabelVisible(true); 
            return;
        };

        const DownArrowIcon  =  () => (
            <DownArrow 
                districtPosition    =   { districtPosition }
                renderAsStudent     =   { renderAsStudent  }
            />
         ); //end DownArrowIcon()


        return (
            <InputContainer>
                {
                    label && labelVisible && !noOuterLabel 
                    && (
                        <LabelText
                            districtPosition    =   { districtPosition }
                            renderAsStudent     =   { renderAsStudent  }
                        >
                            {   label   }
                        </LabelText>
                    )
                }
                {
                    usePicker ? (
                        <RNPickerSelect
                            ref                         =   {   ref } 
                            usePicker                   =   {   usePicker   }

                            name                        =   {   name }
                            useNativeAndroidPickerStyle =   {   false   }
                            items                       =   { items }
                            placeholder                 =   { pickerPlaceHolder }

                            style                       =   {   {...pickerSelectStyle}  }
                            Icon                        =   {   DownArrowIcon }
                            onValueChange               =   {   onChangeText  }
                            onDonePress                 =   {   () => onSubmitEditing()         }
                        />
                    ) : (
                        <TextInputStyled
                            ref                 =   { ref } 
                            districtPosition    =   { districtPosition }
                            renderAsStudent     =   { renderAsStudent }
        
                            name                =   { name }
                            theme               =   { theme }
                            mode                =   { mode }
                            label               =   {  getValues(name) && !isFocused ? "" : placeHolderText }
                            autoCapitalize      =   "none"
                            onChangeText        =   { onChangeText }

                            onSubmitEditing     =   { onSubmitEditing }
                            onFocus             =   { onFocus }
                            onBlur              =   { onBlur }
                                                    {...inputProps}
                        /> 
                    )
                }
                {
                    error ? (
                        <ErrorText 
                            districtPosition    =   { districtPosition }
                            renderAsStudent     =   { renderAsStudent }
                        >
                            <ErrorTextItalicalized
                                districtPosition    =   { districtPosition }
                                renderAsStudent     =   { renderAsStudent }
                            >
                                { `Error:  `}
                            </ErrorTextItalicalized>
                            { error && error.message }
                        </ErrorText>
                    ) : null
                }
              
            </InputContainer>
        ); //end return statement()
    } //end inline function() passed to forwardRef()
); //end forwardRef()

export default Input;