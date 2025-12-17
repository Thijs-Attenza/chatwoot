<script>
import TemplatesPicker from './TemplatesPicker.vue';

export default {
  components: {
    TemplatesPicker,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    contact: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['onSend', 'cancel', 'update:show'],
  data() {
    return {
      selectedWaTemplate: null,
    };
  },
  computed: {
    localShow: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit('update:show', value);
      },
    },
  },
  methods: {
    fixTemplateVariables(message) {
      const replacementList = {
        contactName: this.contact.name,
        contactFirstName: this.contact.name.split(' ')[0],
        contactEmail: this.contact.email,
      };

      Object.keys(replacementList).forEach(key => {
        message = message.replace('{{' + key + '}}', replacementList[key]);
      });
      return message;
    },
    pickTemplate(template) {
      this.selectedWaTemplate = template;
      this.$emit('onSend', this.fixTemplateVariables(template.description));
    },
    onClose() {
      this.$emit('cancel');
    },
  },
};
</script>

<template>
  <woot-modal v-model:show="localShow" :on-close="onClose" size="modal-big">
    <woot-modal-header
      :header-title="$t('EMAIL_TEMPLATES.MODAL.TITLE')"
      :header-content="$t('EMAIL_TEMPLATES.MODAL.SUBTITLE')"
    />
    <div class="row modal-content">
      <TemplatesPicker @on-select="pickTemplate" />
    </div>
  </woot-modal>
</template>

<style scoped>
.modal-content {
  padding: 1.5625rem 2rem;
}
</style>
