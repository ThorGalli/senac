import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';
import { Usuario } from './Usuario.js'

export const Restaurante = sequelize.define('restaurante', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  total: {
    type: DataTypes.INTEGER(6),
    defaultValue: 0
  },
  num: {
    type: DataTypes.INTEGER(5),
    defaultValue: 0
  },
}, {
  paranoid: true
});

Restaurante.belongsTo(Usuario, {
  foreignKey: {
    name: 'usuario_id',
    allowNull: false
  },
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

Usuario.hasMany(Restaurante, {
  foreignKey: 'usuario_id'
})
