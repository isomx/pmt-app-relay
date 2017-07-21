/* eslint-disable */
import Sequelize from 'sequelize';
import { nodesDb } from '../config/settings';

const conn = new Sequelize(
  nodesDb.name,
  nodesDb.username,
  nodesDb.password,
  {
    dialect: 'mysql',
    host: nodesDb.host,
    port: nodesDb.port || 3306,
    define: {
      timestamps: false,
      freezeTableName: true,
    }
  }
);

/**
 * NOTES:
 *  Sequelize.define docs:
 *    http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-init
 *
 * @type {Model}
 */


export const Groups = conn.define('groups', {
  groupId: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  parentId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    defaultValue: '',
  }
});

export const GroupAdmins = conn.define('group_admins', {
  groupId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Groups,
      key: 'groupId',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  userId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
  },
  primary: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
});

export const GroupMeta = conn.define('group_meta', {
  groupId: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    references: {
      model: Groups,
      key: 'groupId',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  metaKey: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  metaValue: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

export const GroupOptions = conn.define('group_options', {
  groupId: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    references: {
      model: Groups,
      key: 'groupId',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  optionKey: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  optionValue: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

export const GroupTypes = conn.define('group_types', {
  type: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    defaultValue: '',
  },
  allowComponents: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  allowApps: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});


export const GroupTypeOptions = conn.define('group_type_options', {
  type: {
    type: Sequelize.STRING,
    primaryKey: true,
    references: {
      model: GroupTypes,
      key: 'type',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  key: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  required: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
});


let Nodes = conn.define('nodes', {
  nodeId: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  parentId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  groupId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    defaultValue: '',
  }
});


let NodeMeta = conn.define('node_meta', {
  nodeId: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    references: {
      model: Nodes,
      key: 'nodeId',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  metaKey: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  metaValue: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});
NodeMeta.belongsTo(Nodes, {foreignKey: 'nodeId', targetKey: 'nodeId'});

let NodeOptions = conn.define('node_options', {
  nodeId: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    references: {
      model: Nodes,
      key: 'nodeId',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  optionKey: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  optionValue: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});
NodeOptions.belongsTo(Nodes, {foreignKey: 'nodeId', targetKey: 'nodeId'});

Nodes.hasMany(NodeMeta, {foreignKey: 'nodeId', sourceKey: 'nodeId'});
Nodes.hasMany(NodeOptions, {foreignKey: 'nodeId', sourceKey: 'nodeId'});

export const NodeTypes = conn.define('node_types', {
  type: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    defaultValue: '',
  }
});


export const NodeTypeOptions = conn.define('node_type_options', {
  type: {
    type: Sequelize.STRING,
    primaryKey: true,
    references: {
      model: NodeTypes,
      key: 'type',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  key: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  required: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
});

export const NodeStyles = conn.define('node_styles', {
  nodeId: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    references: {
      model: Nodes,
      key: 'nodeId',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  styleKey: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  styleValue: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

export const NodeProps = conn.define('node_props', {
  nodeId: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    references: {
      model: Nodes,
      key: 'nodeId',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  propKey: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  propValue: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

export const NodeCss = conn.define('node_css', {
  nodeId: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    references: {
      model: Nodes,
      key: 'nodeId',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  cssKey: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  cssValue: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

//conn.sync({force: true});

/**
const findAll = Nodes.findAll({
  include: [{
    model: NodeOptions,
  }]
})
console.log('node find all = ', findAll);
**/
export default { GroupAdmins };






/** This works, but use the before: or after: param in graphql-sequelize package
export const getGroupAdmins = (some, some2) => {
  console.log('some = ', some);
  console.log('some2 = ', some2);
  return GroupAdmins.findAll().then(admins => {
    console.log('admins.dataValues = ', admins[0].dataValues);
    return admins[0].dataValues;
  });
};
 **/


