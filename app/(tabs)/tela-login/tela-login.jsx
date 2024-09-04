import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [loginMessage, setLoginMessage] = useState(''); 
  const [loading, setLoading] = useState(false); 

  const handleLogin = async () => {
    setLoading(true);
    setLoginMessage('');

    try {
      const response = await fetch('https://taskhub-s37f.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nome,
          email: email,
          password: senha,
        }),
      });

      const data = await response.json();
      console.log('Resposta do servidor:', data); 

      if (response.ok) {
        setLoginMessage('Cadastro Concluído com Sucesso!'); 
      } else {
        setLoginMessage(`Erro: ${data.error}`); 
        console.log('Erro de resposta:', data.error); 
      }
    } catch (error) {
      setLoginMessage('Erro na solicitação.');
      console.error('Erro na solicitação:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    console.log("Redirecionar para cadastro");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Login</Text>
        
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#000000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#000000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.passwordContainer}>
          <Icon name="lock" size={20} color="#000000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!showPassword}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="#000000" />
          </Pressable>
        </View>

        <Pressable style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Carregando...' : 'Entrar'}
          </Text>
        </Pressable>

        <Pressable onPress={handleRegister}>
          <Text style={styles.registerText}>Não tem login? Cadastre-se</Text>
        </Pressable>

        {loginMessage ? (
          <Text style={styles.loginMessage}>{loginMessage}</Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 25, 
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0', 
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
  },
  icon: {
    marginRight: 10,
  },
  loginButton: {
    backgroundColor: '#000000', 
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    marginHorizontal: 16, 
  },
  registerText: {
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  loginMessage: {
    color: '#000000',
    fontSize: 16,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
