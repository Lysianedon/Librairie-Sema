import { shallowMount } from '@vue/test-utils'
import NavbarUser from '@/components/NavbarUser.vue'

describe('NavbarUser.vue', () => {

  it('renders username when set in data', () => {
    const wrapper = shallowMount(NavbarUser, {
        data() {
            return {
                username: 'Test Username',
                isConnected: true
            }
        }
    })
    let username = wrapper.find("h2").text()
    expect(username).toMatch('Test Username')
  })
})
