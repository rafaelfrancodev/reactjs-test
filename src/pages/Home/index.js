import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import api from '../../services/api';

import styles from './styles';

export default function Home() {
    const [countries, setCountries] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    function navigationToDetail(country) {
        navigation.navigate('Holiday', country);
    }

    async function loadCountries() {
        if (loading) {
            return;
        }        
        setLoading(true);
        const response = await api.get(`/holidays/Countries`, { headers: {Authorization: 'Bearer ODI1YjllMzQtZTY1OS00MTRiLWEwZmQtYjQ2NDM1YzVjNTZi'}} );
        setCountries([...countries, ...response.data.countries]);
        setTotal(response.data.countries.length);
        setLoading(false);
    }

    useEffect(() => {
        loadCountries();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Total countries: <Text style={styles.headerTextBold}>{total} </Text>
                </Text>
            </View>
            <Text style={styles.title}>Countries for Holidays</Text>
            <Text style={styles.description}>Select a country to see the holidays: </Text>
            <FlatList style={styles.countryList}
                data={countries}
                key={Math.random().toString()}
                renderItem={({ item: country }) => (
                    <View style={styles.country}>
                        <Text style={styles.countryValue}>{country.name} - {country.code} </Text>                    

                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigationToDetail(country)}>
                            <Text style={styles.detailButtonText}>Show more info</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}