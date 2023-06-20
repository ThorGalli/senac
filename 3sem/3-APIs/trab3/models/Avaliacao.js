import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';
import { Restaurante } from './Restaurante.js';

export const Avaliacao = sequelize.define('avaliacao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  comentario: {
    type: DataTypes.STRING(255),
  },
  nota: {
    type: DataTypes.INTEGER(2),
    allowNull: false
  }
}, {
  tableName: "avaliacoes"
});

Avaliacao.belongsTo(Restaurante, {
  foreignKey: {
    name: 'restaurante_id',
    allowNull: false
  },
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

Restaurante.hasMany(Avaliacao, {
  foreignKey: 'restaurante_id'
})
