import React, { forwardRef, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import { ValidationOptions, FieldError } from 'react-hook-form';

import { InputContainer, LabelText, TextInputStyled, Select, ErrorText, ErrorTextItalicalized, DownArrow } from './InputStyledComponents.js';

const Input = forwardRef((props, ref) => {
        const { appWidth, districtPosition, renderAsStudent, usePicker, label, labelStyle, error, name, onSubmitEditing, onChangeText, noOuterLabel, theme, placeholder, placeHolderText, mode,...inputProps } = props;

        const [ labelVisible, setLabelVisible ] = useState(label);

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

        const staffCategories = [
            { label: "Computer Issue", value: "Computer Issue" },
            { label: "Printer Issue", value: "Printer Issue" },
            { label: "Projector Issue", value: "Projector Issue"},
            { label: "Password Issue", value: "Password Issue"},
            { label: "Canvas", value: "Canvas" },
            { label: "PowerSchool", value: "PowerSchool"},
            { label: "Illuminate", value: "Illuminate"},
            { label: "Google", value: "Google"},
            { label: "Wi-fi Issue", value: "Wi-fi Issue"},
            { label: "Eno Pen -- Board", value: "Eno Pen -- Board"},
            { label: "Software Installation", value: "Software Installation" },
            { label: "Student Chromebook", value: "Student Chromebook"},
            { label: "Phone Issue", value: "Phone Issue"},
            { label: "Other", value: "Other"}
        ];

        const studentCategories = [
            { label: "Password Issue", value: "Password Issue"},
            { label: "Canvas", value: "Canvas" },
            { label: "PowerSchool", value: "PowerSchool"},
            { label: "Illuminate", value: "Illuminate"},
            { label: "Google", value: "Google"},
            { label: "Wi-fi Issue", value: "Wi-fi Issue"},
            { label: "Software Installation", value: "Software Installation"},
            { label: "Student Chromebook", value: "Student Chromebook"},
            { label: "Other", value: "Other"}
        ];

        const categories = (districtPosition === "student") ? studentCategories : staffCategories;

        const pickerPlaceHolder =    {
            label: 'Select a category type...',
            value: null,
            color: 'red',
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
                            items                       =   { categories }
                            //placeholder                 =   { pickerPlaceHolder }

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
                            label               =   {  placeHolderText }
                            autoCapitalize      =   "none"
                            onChangeText        =   { onChangeText }

                            onSubmitEditing     =   { onSubmitEditing }
                            onFocus             =   { () => setLabelVisible(false) }
                            onBlur              =   { () => setLabelVisible(true) }
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