import { shallowMount } from '@vue/test-utils'
import BookListComponent from '@/components/admin/BookListComponent.vue'

describe('BookListComponent.vue', () => {
  it('renders the number of books in bookList when set in data', () => {
    const bookList = [{ bookOne: 'book' }, { bookTwo: 'book' }, { bookThree: 'book' }]
    const wrapper = shallowMount(BookListComponent, {
      propsData: { bookList }
    })
    const numberOfBooks = wrapper.find('h4').text()
    expect(numberOfBooks).toMatch('3 résultat(s)')
  })
})

// describe('BookListComponent.vue', () => {
//   it('renders the number of books in bookList when set in data', () => {
//     const wrapper = shallowMount(BookListComponent, {
//       computed: {
//         numberOfBooks () {
//           return 3
//         }
//       }
//     })
//     const numberOfBooks = wrapper.find('h4').text()
//     expect(numberOfBooks).toMatch('3 résultat(s)')
//     })
//   })
