<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore, useMapGetter } from 'dashboard/composables/store';
import { useI18n } from 'vue-i18n';

const emit = defineEmits(['onSelect']);

const { t } = useI18n();
const store = useStore();
const query = ref('');

const fetchCannedResponses = async () => {
  try {
    await store.dispatch('getCannedResponse');
  } catch (error) {
    // Ignore Error
  }
};

const emailTemplateMessages = useMapGetter('getCannedEmailResponses');

onMounted(() => {
  fetchCannedResponses();
});

const filteredTemplateMessages = computed(() => {
  return emailTemplateMessages.value
    .map(cannedMessage => ({
      label: cannedMessage.short_code,
      key: cannedMessage.short_code,
      description: cannedMessage.content,
    }))
    .filter(cannedMessage =>
      cannedMessage.key.toLowerCase().includes(query.value.toLowerCase())
    );
});
</script>

<template>
  <div class="w-full">
    <div class="flex gap-2 mb-2.5">
      <div
        class="flex flex-1 gap-1 items-center px-2.5 py-0 rounded-lg bg-n-alpha-black2 outline outline-1 outline-n-weak hover:outline-n-slate-6 dark:hover:outline-n-slate-6 focus-within:outline-n-brand dark:focus-within:outline-n-brand"
      >
        <fluent-icon icon="search" class="text-n-slate-12" size="16" />
        <input
          v-model="query"
          type="search"
          :placeholder="t('EMAIL_TEMPLATES.PICKER.SEARCH_PLACEHOLDER')"
          class="reset-base w-full h-9 bg-transparent text-n-slate-12 !text-sm !outline-0"
        />
      </div>
    </div>
    <div
      class="bg-n-background outline-n-container outline outline-1 rounded-lg max-h-[18.75rem] overflow-y-auto p-2.5"
    >
      <div v-if="emailTemplateMessages.length">
        <div v-for="template in filteredTemplateMessages" :key="template.id">
          <button
            class="block p-2.5 w-full text-left rounded-lg cursor-pointer hover:bg-n-alpha-2 dark:hover:bg-n-solid-2"
            @click="emit('onSelect', template)"
          >
            <p
              class="max-w-full min-w-0 mb-0 overflow-hidden text-sm font-medium text-n-slate-12 group-hover:text-n-slate-12 text-ellipsis whitespace-nowrap"
            >
              {{ template.key }}
            </p>
            <p
              class="max-w-full min-w-0 mb-0 overflow-hidden text-xs text-n-slate-11 group-hover:text-n-slate-12 text-ellipsis whitespace-nowrap"
            >
              {{ template.description }}
            </p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.label-body {
  font-family: monospace;
}
</style>
