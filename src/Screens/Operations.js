import React, {useEffect,useState} from 'react';
import { View, Text, Button, FlatList, ScrollView } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as bankActions from '#/Store/Actions/bankActions';
import * as operationActions from '#/Store/Actions/operationActions';

import Loader from '#/Components/Loader';


const OperationItem = ({description,value,type,bank}) => (
  <View style={{flex:1, flexDirection:'row',borderWidth:1}}>
    <View style={{flex:1,alignItems:"center",borderRightWidth:1}}>
      <Text>{description}</Text>
    </View>
    <View style={{flex:1,alignItems:"center",borderRightWidth:1}}>
      <Text>{value}</Text>
    </View>
    <View style={{flex:1,alignItems:"center",borderRightWidth:1}}>
      <Text>{type}</Text>
    </View>
    <View style={{flex:1,alignItems:"center"}}>
      <Text>{bank}</Text>
    </View>
  </View>
)

const HeaderOperations = () => (
  <View style={{flex:1,flexDirection:'row',borderWidth:1}}>
    <View style={{flex:1,alignItems:"center",borderRightWidth:1}}>
      <Text style={{fontWeight:'bold'}}>DESC.</Text>      
    </View>
    <View style={{flex:1,alignItems:"center",borderRightWidth:1}}>
      <Text style={{fontWeight:'bold'}}>VALUE</Text>
    </View>
    <View style={{flex:1,alignItems:"center",borderRightWidth:1}}>
      <Text style={{fontWeight:'bold'}}>TYPE</Text>
    </View>
    <View style={{flex:1,alignItems:"center"}}>
      <Text style={{fontWeight:'bold'}}>BANK</Text>
    </View>
  </View>
)


const Operations = (props) => {

  const renderOperations = ({ item }) => (
    <OperationItem 
      description={item.description} 
      value={item.value} 
      type={item.type}
      bank={item.bank !== null ? item.bank.name : 'Not Informed'}
    />
  );
  const { banks, operations } = props

  return (
    <View style={{flex:1, marginBottom: 100}}>
      <Text style={{alignSelf:'center', marginTop: '10%', fontSize: 20}} >OPERATIONS</Text>

      <View style={{flex:1,marginHorizontal:20, marginTop:20}}>
        {operations.hasOperations ?
          <View style={{marginBottom:10, backgroundColor:'white', height:'50%'}}>
            <FlatList 
            renderItem={renderOperations}
            initialNumToRender='30'
            data={operations.operations}          
            ListHeaderComponent={HeaderOperations}
            keyExtractor={item => item.id.toString()}
            />
          </View>          
          :
          <View style={{borderWidth:1, alignItems:'center', paddingVertical:10, marginBottom: 10}}>
            <Text>Empty Data of Operations</Text>
          </View>
        }
      </View>
    </View>
  );
}

const mapStateToProps = state => ({banks: state.banks, operations: state.operations})
 
const mapDispatchToProps = dispatch => 
  bindActionCreators(Object.assign({},bankActions,operationActions), dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Operations);