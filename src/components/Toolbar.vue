<script setup lang="ts">
import { toolbar } from "@/hooks/use-tools";
import type { Tool } from "@/hooks/use-tools";

function unique(tools: Tool[]) {
  return tools
    .filter(
      (value, index, self) =>
        self.findIndex((candidate) => value.icon === candidate.icon) === index
    )
    .filter((tool) => tool.documented !== false);
}

function description(tool: Tool) {
  return `${tool.description} (${tool.keybinding})`;
}
</script>

<template>
  <aside
    id="va-toolbar"
    class="twvac-flex twvac-flex-wrap twvac-items-center twvac-justify-center twvac-max-w-lg twvac-px-8 twvac-py-5 dark:twvac-bg-gray-800 twvac-bg-gray-200 twvac-rounded-lg twvac-shadow-toolbar twvac-border twvac-border-gray-700 twvac-gap-10 lg:twvac-max-w-3xl"
  >
    <tool-group
      v-for="(group, i) in toolbar"
      :key="`${group.name}${i}`"
      :name="group.name"
      :keep="!group.name"
    >
      <template
        v-for="(tool, y) in unique(group.actions)"
        :key="`${tool.description}${y}`"
      >
        <!-- Primary actions -->
        <action-button
          v-if="tool.primary !== undefined"
          :title="description(tool)"
          class="twvac-ml-2"
          @click="() => tool.action?.()"
        >
          <span v-if="tool.primary" class="twvac-mr-1" v-text="tool.primary" />
          <icon v-if="tool.icon" :name="tool.icon" class="twvac-w-5 twvac-h-5" />
        </action-button>

        <!-- Normal actions -->
        <tool-button v-else :title="description(tool)" @click="() => tool.action?.()">
          <icon v-if="tool.icon" :name="tool.icon" class="twvac-w-6 twvac-h-6" />
        </tool-button>
      </template>
    </tool-group>
  </aside>
</template>

<style scoped></style>
