import React from 'react'
import { useFormikContext } from 'formik'

import ErrorMessage from './ErrorMessage'
import PickerItem from "../PickerItem";
import Picker from '../Picker'

export default function FormField({name, items, placeholder,width,PickerItemComponent=PickerItem,numberOfColumns, ...otherProps}) {

    const {values, setFieldValue, errors, touched} = useFormikContext();

    return (
        <>
            <Picker
              {...otherProps}
              placeholder={placeholder}
              items={items}
              PickerItemComponent={PickerItemComponent}
              numberOfColumns={numberOfColumns}
              onSelectItem={(item)=> setFieldValue(name, item)}
              selectedItem={values[name]}
              width={width}
              style={{flex:1}}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    )
}
