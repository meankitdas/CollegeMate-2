import React from 'react'
import { View, StyleSheet } from 'react-native'

import Screen from '../components/Screen'
import Form from "../components/Forms/Form"
import SendBtn from "../components/Forms/SendBtn"

export default function DiscussionScreen() {
    return (
        <Screen>
            <Form
            initialValues={{
              title: "",
              price: "",
              description: "",
              category: null,
              images: [],
            }}
            onSubmit={handleSubmit}
            validationSchema={ValidationSchema}
          >
              <SendBtn maxLength={255} name="title" placeholder="Title" />

          </Form>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {}
})