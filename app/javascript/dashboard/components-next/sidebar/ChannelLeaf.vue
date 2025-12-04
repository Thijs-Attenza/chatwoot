<script setup>
import { computed, onMounted } from 'vue';
import Icon from 'next/icon/Icon.vue';
import ChannelIcon from 'next/icon/ChannelIcon.vue';
import { useMapGetter } from '../../composables/store';
import { useStore } from 'dashboard/composables/store.js';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  inbox: {
    type: Object,
    required: true,
  },
});

const store = useStore();

const conversationMenuStats = useMapGetter('conversationMenuStats/getStats');

onMounted(() => {
  store.dispatch('fetchConversationStatus', props.inbox.id);
});

const reauthorizationRequired = computed(() => {
  return props.inbox.reauthorization_required;
});

const conversationCount = computed(() => {
  return conversationMenuStats.value?.inbox_count?.[props.inbox.id] ?? '-';
});
</script>

<template>
  <span
    class="size-5 grid place-content-center rounded-full bg-n-alpha-2"
    :class="{ 'bg-n-solid-blue': active }"
  >
    <ChannelIcon :inbox="inbox" class="size-3" />
  </span>
  <div class="flex-1 truncate min-w-0">{{ label }}</div>
  <div
    class="rounded-md h-5 flex items-center justify-center text-xxs font-semibold my-0 mx-1 px-1 py-0 min-w-[20px]"
    :class="[
      active
        ? 'bg-n-brand/10 dark:bg-n-brand/20 text-n-blue-text'
        : 'bg-n-alpha-black2 dark:bg-n-solid-3 text-n-slate-11',
    ]"
  >
    <span>
      {{ conversationCount }}
    </span>
  </div>
  <div
    v-if="reauthorizationRequired"
    v-tooltip.top-end="$t('SIDEBAR.REAUTHORIZE')"
    class="grid place-content-center size-5 bg-n-ruby-5/60 rounded-full"
  >
    <Icon icon="i-woot-alert" class="size-3 text-n-ruby-9" />
  </div>
</template>
