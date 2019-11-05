<template>
  <b-container>
    <b-col class="main-content" xl="5" lg="6" md="8" sm="10">
      <content-header>Contact</content-header>
      <div
        v-if="shouldShowGeneralError"
        class="text-danger general-error"
      >
        Please fill out the fields.
      </div>
      <b-form>
        <b-form-group label="Name:" :invalid-feedback="invalidName" :state="nameState">
          <b-form-input id="name" v-model="name" :state="nameState" trim placeholder="Enter name" />
        </b-form-group>

        <b-form-group label="Email address:" :invalid-feedback="invalidEmail" :state="emailState">
          <b-form-input
            id="email"
            v-model="email"
            type="email"
            :state="emailState"
            placeholder="Enter email"
          />
        </b-form-group>

        <b-form-group
          ref="phoneNumber"
          label="Phone number:"
          :invalid-feedback="invalidPhone"
          :state="phoneState"
        >
          <client-only placeholder="loading...">
            <vue-tel-input
              v-model="phone.number"
              :state="phoneState"
              :class="[phone.valid == null ? 'form-control is-null' : (phone.valid == true ? 'form-control is-valid' : 'form-control is-invalid')]"
              @onInput="updateNumber"
            />
          </client-only>
        </b-form-group>
        <b-form-group label="Message:" :invalid-feedback="invalidMessage" :state="messageState">
          <b-form-textarea
            id="message"
            v-model="message"
            :state="messageState"
            placeholder="Enter your message"
          />
        </b-form-group>

        <b-button
          id="submit-button"
          type="submit"
          variant="primary"
          :disabled="!formState"
          class="btn-lg"
          @:click="submitForm($event)"
        >
          Submit
        </b-button>
      </b-form>
    </b-col>

    <transition
      name="fadeUp"
      :duration="{ enter: 1800, leave: 1800 }"
      @:after-enter="showMessage = false"
    >
      <p v-if="showMessage" id="message-sent">
        Message Sent!
      </p>
    </transition>
  </b-container>
</template>

<script>
import emailField from '../mixins/emailField.js'
import ContentHeader from '@/components/ContentHeader.vue'

export default {
  components: {
    ContentHeader
  },
  mixins: [emailField],
  data () {
    return {
      name: null,
      phone: {
        number: null,
        fullNumber: null,
        valid: null
      },
      message: null,
      showMessage: null
    }
  },
  computed: {
    nameState () {
      if (this.name == null) {
        return null
      }
      return this.name.length >= 4 && this.name.length <= 20
    },
    invalidName () {
      if (
        this.name == null ||
        (this.name.length > 4 && this.name.length <= 20)
      ) {
        return ''
      } else if (this.name.length > 0 || this.name.length > 20) {
        return 'Name must be between 4 and 20 characters.'
      } else {
        return 'Please enter your name.'
      }
    },
    phoneState () {
      if (this.phone.valid == null) {
        return null
      }
      return this.phone.valid
    },
    invalidPhone () {
      if (this.phone.valid == null) {
        return ''
      } else if (this.phone.number === undefined) {
        return `${this.phone.number} is not a valid number.`
      } else if (!this.phone.isValid) {
        return `${this.phone.fullNumber} is not a valid number.`
      }
      return ''
    },
    messageState () {
      if (this.message == null) {
        return null
      }
      return this.message.length >= 4 && this.message.length <= 20
    },
    invalidMessage () {
      if (this.message == null) {
        return ''
      } else if (this.message.length < 4 || this.message.length > 500) {
        return 'This message must be between 4 and 500 characters'
      }
      return ''
    },
    formState () {
      return (
        (this.nameState &&
          this.emailState &&
          this.phoneState &&
          this.messageState) === true
      )
    },
    shouldShowGeneralError () {
      if (
        this.name == null ||
        this.email == null ||
        this.phone.valid == null ||
        this.message == null
      ) {
        return false
      } else {
        return !this.formState
      }
    }
  },
  methods: {
    submitForm (event) {
      event.preventDefault()
      this.clearForm()
      this.showMessage = true
    },
    updateNumber ({ isValid, country }) {
      this.phone.fullNumber = `+${country.dialCode} ${this.phone.number}`
      this.phone.valid = isValid
    },
    clearForm () {
      this.name = null
      this.phone.number = ''
      this.phone.fullNumber = ''
      this.phone.valid = null
      this.message = null
      this.email = null
    }
  }
}
</script>

<style scoped>
@import "../assets/css/generalForm.css";
.vue-tel-input {
  border: 1px solid #ced4da;
}

.vue-tel-input.is-null:focus-within {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  border-color: #80bdff;
}

.vue-tel-input.is-valid:focus-within {
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
  border-color: #28a745;
}

.vue-tel-input.is-invalid:focus-within {
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
  border-color: #dc3545;
}

.vti__dropdown {
  padding: 0px !important;
}

textarea {
  height: 150px !important;
}

#message-sent {
  position: absolute;
  top: 50px;
  right: 50px;
  color: mediumseagreen;
  font-size: 2rem;
  text-align: right;
  margin-top: 2rem;
}
</style>
