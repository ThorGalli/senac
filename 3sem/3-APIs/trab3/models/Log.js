import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';
import { Usuario } from './Usuario.js'

export const Log = sequelize.define('log', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descricao: {
    type: DataTypes.STRING(60),
    allowNull: false
  }
});

Log.belongsTo(Usuario, {
  foreignKey: {
    name: 'usuario_id',
    allowNull: false
  },
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

Usuario.hasMany(Log, {
  foreignKey: 'usuario_id'
})
