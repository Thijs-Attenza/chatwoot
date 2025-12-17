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
    pickTemplate(template) {
      this.selectedWaTemplate = template;
      this.$emit('onSend', template.description);
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
