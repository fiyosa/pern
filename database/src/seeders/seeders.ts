import { user } from './1663816802690_user_seed'
import { role_permission } from './1663994077620_role_permission_seed'
import { menu } from './1664012621637_menu_seed'
import { category } from './1664018376545_category_seed'
;(async () => {
  await user()
  await role_permission()
  await menu()
  await category()
})()
