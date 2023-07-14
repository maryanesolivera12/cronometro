import React,{useState} from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet,Image, TouchableOpacity,Text} from 'react-native';

let timer = null;
let segundos = 0;
let minutos =0 ;
let horas = 0;

export default function App() {

  const[numero,setNumero]= useState('0');
  const[botao,setBotao] = useState('INICIAR');
  const[ultimo,setUtimo]= useState('');

  function iniciar(){
    if(timer !== null) { 
      clearInterval(timer);
      timer = null;
      setBotao('INICIAR');
    }else{
      timer = setInterval(()=>{

        segundos++; 

        if(segundos == 60){
          segundos = 0;
          minutos++;
        }

        if (minutos == 60){
          minutos=0;
          horas++;
        }

        let formatado =(horas<10? '0' + horas: horas) + ':' 
               + (minutos<10? '0' + minutos: minutos) + ':'
               + (segundos<10? '0' + segundos: segundos);



        setNumero(formatado);

        

      }, 1000)
      setBotao('PARAR');
    }

  }

  function zerar(){
    if(timer !==null){
      clearInterval(timer);
      timer = null;
    }
    setUtimo(numero);
    setNumero(0);
    segundos =0;
    minutos = 0;
    horas =0;
    setBotao('INICIAR');

  

  }

 return (
   <SafeAreaView style={styles.Container}>
    <StatusBar/>

    <Image
    source={require('./src/Images/cronometro.png')}
    />

    <Text style={styles.tempo}>
      {numero == 0? '00:00:00' : numero}
    </Text>

    <View style={styles.viewBotao}>
      <TouchableOpacity style={styles.btn} onPress={iniciar}>

        <Text style={styles.btnTexto}>
          {botao}
        </Text>

     </TouchableOpacity>

     <TouchableOpacity style={styles.btn} onPress={zerar}>

        <Text style={styles.btnTexto}>
          ZERAR
        </Text>

     </TouchableOpacity>

    </View>

    <Text style={styles.tempoMedido}>
      {ultimo}
    </Text>

   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container:{
    flex:1,
    backgroundColor: '#7464a0',
    alignItems: 'center',
    justifyContent:'center'

  },
  tempo:{
    fontSize:45, //tamanho da fonte
    fontWeight: 'bold', // deixa o texto negrito
    color:'#fff', // cor do texto
    marginTop:-170 //trombando na imagem, por isso negativo
  },

  viewBotao:{
    width:'100%',
    flexDirection: 'row',
    marginTop: 180,
    height:40,
    justifyContent:'space-around'
    

  },

  btn:{
 
    justifyContent:'center',
    alignItems:'center',
    height:40,
    backgroundColor:'#fff',
    width:170,
    borderRadius:20

  },

  btnTexto:{

    fontSize:20,
    fontWeight:'bold',
    color:'#7464ab'
  },
  tempoMedido:{
    fontSize:30,
    fontStyle:'italic',
    color:'#fff',
    fontWeight:'bold',
    marginTop:40


  }




});
