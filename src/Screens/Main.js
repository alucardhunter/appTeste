import React, {useEffect,useState} from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as bankActions from '#/Store/Actions/bankActions';
import * as operationActions from '#/Store/Actions/operationActions';
import bankController from '#/Controller/Bank/bankController';
import operationController from '#/Controller/Operations/operationsController';
import Loader from '#/Components/Loader';


const Bank = ({name,active,overdraft}) => (
  <View style={{flex:1, flexDirection:'row',borderWidth:1}}>
    <View style={{flex:1,alignItems:"center",borderRightWidth:1}}>
      <Text>{name}</Text>
    </View> 
    <View style={{flex:1, alignItems:"center",borderRightWidth:1}}>
      <Text>{active ? 'Ativo' : 'Inativo'}</Text>
    </View>
    <View style={{flex:1, alignItems:"center"}}>
      <Text>{overdraft}</Text>
    </View>
  </View>
)

const HeaderBank = () => (
  <View style={{flex:1,flexDirection:'row',borderWidth:1}}>
    <View style={{flex:1,alignItems:"center",borderRightWidth:1}}>
      <Text style={{fontWeight:'bold'}}>NAME</Text>
    </View>
    <View style={{flex:1, alignItems:"center",borderRightWidth:1}}>
      <Text style={{fontWeight:'bold'}}>SITUATION</Text>
    </View>
    <View style={{flex:1, alignItems:"center"}}>
      <Text style={{fontWeight:'bold'}}>OVERDRAFT</Text>
    </View>
  </View>
)

const Operation = ({description,value,type,bank}) => (
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

const Main = (props) => {
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {
    onload()
  }, []);

  useEffect(() => {
    handleLoader()
  }, [props.banks.isLoading,props.operations.isLoading]);

  const onload = () => {
    props.listBanks()
    props.listOperations()
    bankController.list()
    .then(r =>{
      props.banksLoadedSuccess(r)
    })
    .catch(error =>{
      props.banksLoadedFailure()
      console.log(error)
    })
    operationController.list()
    .then(r =>{
      console.log(r)
      if (r.length > 0){
        props.operationsLoadedSuccess(r)
      }else{
        props.operationsLoadedFailure()
      }      
    })
    .catch(error =>{
      props.operationsLoadedFailure()
      console.log(error)
    })
  }
  
  const handleLoader = () => {
    if (props.banks.isLoading === true || props.operations.isLoading === true) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }

  const renderBank = ({ item }) => (
    <Bank name={item.name} active={item.active} overdraft={item.overdraft}/>
  );
  const renderOperations = ({ item }) => (
    <Operation 
      description={item.description} 
      value={item.value} 
      type={item.type}
      bank={item.bank !== null ? item.bank.name : 'Not Informed'}
    />
  );
  const { banks, operations } = props
  return (
    <View style={{flex:1, marginBottom: 100}}>
      <Loader loading={isLoading}/>
      <Text style={{alignSelf:'center', marginTop: '10%', fontSize: 20}} >Bank Finance</Text>
      <View style={{marginHorizontal:20}}>
        <Text style={{fontSize: 15, fontWeight:'bold'}} >Banks</Text>
        { banks.hasBanks ?
          <View style={{marginBottom:10}}>
            <FlatList 
              renderItem={renderBank}
              data={banks.banks}          
              ListHeaderComponent={HeaderBank}
              keyExtractor={item => item.id.toString()}
            />
          </View>
          :
          <View style={{borderWidth:1, alignItems:'center', paddingVertical:10}}>
            <Text>Empty Data of Banks</Text>
          </View>
        }
        <View style={{marginBottom:10}}>
          <Button onPress={() => props.navigation.push('Banks')} title="BANK ACCOUNTS"/>
        </View>
      </View>
      <View style={{flex:1,marginHorizontal:20, marginTop:20}}>
        <Text style={{fontSize: 15, fontWeight:'bold'}} >Operations</Text>
        {operations.hasOperations ?
          <View style={{marginBottom:10}}>
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

export default connect(mapStateToProps,mapDispatchToProps)(Main);