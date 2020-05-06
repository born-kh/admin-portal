// function MainNav(permissions) {
//   var Nav = [];
//   if (permissions) {
//     if (permissions.ACC_SYS_MODIFY_TRACER_MANAGER === 'ALLOW') {
//       Nav.push({
//         icon: 'pe-7s-rocket',
//         label: 'Tracer-Manager',
//         content: [
//           {
//             label: 'Tracers',
//             to: '/tracer-manager/tracers'
//           }
//         ]
//       });
//     }

//     if (permissions.ACC_SYS_MODIFY_PASSPORT_MANAGER === 'ALLOW') {
//       Nav.push({
//         icon: 'pe-7s-plugin',
//         label: 'Passport-Manager',

//         content: [
//           {
//             label: 'New Documents',
//             to: '/passport-manager/applications'
//           },
//           {
//             label: 'Search Account',
//             to: '/passport-manager/search'
//           }
//         ]
//       });
//     }

//     if (permissions.ACC_SYS_MODIFY_USER_MANAGER === 'ALLOW') {
//       Nav.push({
//         icon: 'pe-7s-browser',
//         label: 'User-Manager',
//         content: [
//           {
//             label: 'Users',
//             to: '/user-manager/users'
//           }
//         ]
//       });
//     }
//   }
//   return Nav;
// }

// export default MainNav;

export const MainNav = [
  {
    id: 1,
    label: 'User-Manager',
    content: [
      {
        id: 12,
        label: 'Users',
        path: `${process.env.PUBLIC_URL}/user-manager/users`
      }
    ]
  },

  {
    id: 2,

    label: 'Passport-Manager',

    content: [
      {
        id: 22,
        label: 'New Documents',
        path: `${process.env.PUBLIC_URL}/passport-manager/applications`
      }
    ]
  },
  {
    id: 3,
    label: 'Tracer-Manager',
    content: [
      {
        id: 33,
        label: 'Tracers',
        path: `${process.env.PUBLIC_URL}/tracer-manager/tracers`
      }
    ]
  },
  {
    id: 4,
    label: 'ApiKey-Manager',
    content: [
      {
        id: 44,
        label: 'ApiKey List',
        path: `${process.env.PUBLIC_URL}/apikey-manager/apikeys`
      }
    ]
  }
];
