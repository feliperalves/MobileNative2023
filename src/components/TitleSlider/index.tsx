import React from "react"
import { Text } from "react-native"
import { styles } from './styles'

export interface ITitle {
    titleI: String
}
export function TitleSlider({ titleI }: ITitle) {
    return (
        <Text style={styles.title}>{}</Text>
    )
}