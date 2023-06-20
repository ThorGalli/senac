import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt'

import { sequelize } from '../databases/conecta.js';

export const Usuario = sequelize.define('usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
});

// Hook (gancho) do Sequelize que é executado antes 
// da inserção de um registro.
// Faz a criptografia da senha e atribui o hash ao campo senha
Usuario.beforeCreate(usuario => {
  const salt = bcrypt.genSaltSync(12)
  const hash = bcrypt.hashSync(usuario.senha, salt)
  usuario.senha = hash  
});