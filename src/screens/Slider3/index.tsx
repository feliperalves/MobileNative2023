import React from "react";
import { FlatList, ImageBackground, View } from "react-native";
import { IPage } from "../../../App";
import { ComponentButtonSlider, ComponentListMarker, ComponentTitleSlider} from '../../components';
import { styles } from './styles';
export function Slider3({ setPageI }: IPage) { 
    const slide3 = require("../../assets/slide3.png")
    const slide3Texts = [
        { id: '1', text: 'Coca-Cola' },
        { id: '2', text: 'Guaraná Antarctica' },
        { id: '3', text: 'Fanta' },
        { id: '4', text: 'Vinho' },
        { id: '5', text: 'Cerveja' },
    ]
    return (
        <ImageBackground source={slide3} style={styles.container} >
            <View style={styles.panel}>
                <ComponentTitleSlider titleI='Bebidas'/>
                <FlatList
                    data={slide3Texts}
                    renderItem={({ item }) =>
                        <ComponentListMarker key={item.id} textMarker= {item.text} /> 
                    }
                    keyExtractor= {(item) => item.id}
                />
            </View>    
            <View style={styles.buttonSlider}>
                <ComponentButtonSlider onPressI={() => setPageI(1)} cor={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(2)} cor={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(3)} cor={true}/>
                <ComponentButtonSlider onPressI={() => setPageI(4)} cor={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(5)} cor = {false}/>
            </View>
        </ImageBackground>
    );
}
