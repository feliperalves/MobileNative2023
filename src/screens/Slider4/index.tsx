import { FlatList, ImageBackground , View } from 'react-native';
import { IPage } from '../../../App';
import {ComponentButtonSlider, ComponentListMarker, ComponentTitleSlider, ComponentButtonInterface} from '../../components';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native'
export function Slider4({ setPageI }: IPage) { 
    const slide4 = require("../../assets/slide4.png")
    const slide4Texts = [
        { id: '1', text: 'Cartão de crédito' },
        { id: '2', text: 'Cartão de débito' },
        { id: '3', text: 'Dinheiro' },
        { id: '4', text: 'Pix' },
    ]
    return (
        <ImageBackground source={slide4} style={styles.container} >
            <View style={styles.panel}>
                <ComponentTitleSlider titleI='Método de Pagamento' />
                <FlatList
                    data={slide4Texts}
                    renderItem={({ item }) =>
                        <ComponentListMarker key={item.id} textMarker={item.text} />
                    }
                    keyExtractor={(item) => item.id}
                />
                <ComponentButtonInterface title= "Entrar" type ="third" onPressI={() => {setPageI(5)}} />
            </View>
            <View style={styles.buttonSlider}>
                <ComponentButtonSlider onPressI={() => setPageI(1)} cor={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(2)} cor={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(3)} cor={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(4)} cor={true}/>
                <ComponentButtonSlider onPressI={() => setPageI(5)} cor = {false}/>
            </View>
        </ImageBackground>
    );

}