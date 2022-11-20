import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import COR from '../assets/CSS/COR';

const { width } = Dimensions.get('window');

export default function CardHorizontal(){
    return (
        <ScrollView 
          style={styles.container}
          //pagingEnabled={true}
          horizontal= {true}
          decelerationRate={0}
          snapToInterval={width}
          snapToAlignment={"center"}
          contentInset={{
            top: 0,
            left: 30,
            bottom: 0,
            right: 30,
          }}>
            <TouchableOpacity>
            <View style={styles.view} />
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.view2} />
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.view} />
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.view2} />
            </TouchableOpacity>
          
        </ScrollView>
      );
    }

    const styles = StyleSheet.create({
        container: {},
        view: {
          marginTop: 10,
          backgroundColor: 'blue',
          width: width - 20,
          margin: 10,
          height: 200,
          borderRadius: 10,
          shadowColor: COR.cinza,
          shadowOffset: {
              width: 0,
              height: 7,
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,
          elevation: 15,
          //paddingHorizontal : 30
        },
        view2: {
          marginTop: 10,
          backgroundColor: 'red',
          width: width -20,
          margin: 10,
          height: 200,
          borderRadius: 10,
          shadowColor: COR.cinza,
          shadowOffset: {
              width: 0,
              height: 7,
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,
          elevation: 15,
          //paddingHorizontal : 30
        },
      });