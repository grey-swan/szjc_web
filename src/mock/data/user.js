import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    avatar: 'https://thirdwx.qlogo.cn/mmopen/9bric97vH3E0icZ9DCdzI9gsvWT9AIYzAGjF25tSf1Yiac0ib5Jbp34jdsaE9ArqO3Rz2AwIlUqhibKRibXbMicmOvBOL9Ttf8AOnuu/132',
    name: '管理员'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers, Users };
