import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import styles from './styles';

export default function Holiday() {

    const route = useRoute();
    const country = route.params;

    const navigation = useNavigation();

    const [holidays, setHolidays] = useState([]);    
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const request = {   country_code: country.code, year: 2022 };
    
    function navigationBack() {
        navigation.goBack();
    }

    async function loadHolidays() {
        if (loading) {
            return;
        }      
        setLoading(true);       
        const response = await api.post(`/holidays/List`, request, { headers: {Authorization: 'Bearer ODI1YjllMzQtZTY1OS00MTRiLWEwZmQtYjQ2NDM1YzVjNTZi'}} );
        console.log(response);
        setHolidays([...holidays, ...response.data.holidays]);
        setTotal(response.data.holidays.length);
        setLoading(false);
    }

    useEffect(() => {
        loadHolidays();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Total holidays: <Text style={styles.headerTextBold}>{total} </Text>
                </Text>
                <TouchableOpacity onPress={navigationBack}>
                    <Feather name="arrow-left" size={16} color="#e02041" />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Holidays for {country.name}</Text>
            <FlatList style={styles.countryList}
                data={holidays}
                key={Math.random().toString()}                
                renderItem={({ item: country }) => (
                    <View style={styles.country}>
                        <Text style={styles.countryValue}>{country.name} - {country.country_code} </Text>                      
                    </View>
                )}
            />
        </View>
    );
}