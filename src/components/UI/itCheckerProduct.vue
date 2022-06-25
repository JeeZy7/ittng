<template>
  <input
      type="checkbox"
      class="form-check-input"
      :value="value"
      :checked="modelValue.includes(value)"
      @change="evt => onChange(evt.target.value)"
  >
</template>

<script>
export default {
  name: "itCheckerProduct",
  props: {
    product: {
      type: Object,
      required: true
    },
    value: {
      type: String,
      default: null,
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onChange(value){
      if(this.modelValue.includes(this.value)) {
        this.$emit('update:modelValue', this.modelValue.filter(cv => cv !== value ))
      }
      else {
        this.$emit('update:modelValue', this.modelValue.concat(value))
      }
    }
  },
}
</script>

<style scoped>

</style>