<script>
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';

  export let data;
  export let form;

  let showAddForm = false;
  let editingQuestion = null;
  let newQuestion = {
    question: '',
    options: ['', '', '', ''],
    correct_answer: 0,
  };

  function resetForm() {
    newQuestion = {
      question: '',
      options: ['', '', '', ''],
      correct_answer: 0,
    };
    showAddForm = false;
    editingQuestion = null;
  }

  function editQuestion(question) {
    editingQuestion = question;
    newQuestion = {
      question: question.question,
      options: JSON.parse(question.options),
      correct_answer: question.correct_answer,
    };
    showAddForm = true;
  }

  function logout() {
    fetch('/admin/logout', { method: 'POST' }).then(() => goto('/admin'));
  }
</script>

<div class="bg-surface-50-900-token min-h-screen">
  <!-- Header -->
  <div class="bg-surface-100-800-token border-surface-300-600-token border-b">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between py-6">
        <div>
          <h1 class="text-3xl font-bold text-primary-500">Admin Dashboard</h1>
          <p class="text-surface-600-300-token">Manage citizenship test questions</p>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-surface-600-300-token text-sm">
            Total Questions: {data.questions.length}
          </span>
          <button on:click={logout} class="variant-ghost-error btn"> Logout </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    {#if form?.success}
      <div class="alert variant-filled-success mb-6">
        <div class="alert-message">
          <p>{form.message}</p>
        </div>
      </div>
    {/if}

    {#if form?.error}
      <div class="alert variant-filled-error mb-6">
        <div class="alert-message">
          <p>{form.error}</p>
        </div>
      </div>
    {/if}

    <!-- Add Question Button -->
    <div class="mb-8">
      <button on:click={() => (showAddForm = !showAddForm)} class="variant-filled-primary btn">
        {showAddForm ? 'Cancel' : 'Add New Question'}
      </button>
    </div>

    <!-- Add/Edit Question Form -->
    {#if showAddForm}
      <div class="card variant-filled-surface mb-8 p-6">
        <h2 class="mb-4 text-xl font-bold">
          {editingQuestion ? 'Edit Question' : 'Add New Question'}
        </h2>

        <form
          method="POST"
          action="?/{editingQuestion ? 'update' : 'add'}"
          use:enhance={() => {
            return async ({ result }) => {
              if (result.type === 'success') {
                resetForm();
              }
            };
          }}
        >
          {#if editingQuestion}
            <input type="hidden" name="id" value={editingQuestion.id} />
          {/if}

          <div class="space-y-6">
            <div>
              <label for="question" class="label">
                <span class="text-sm font-medium">Question</span>
              </label>
              <textarea
                id="question"
                name="question"
                bind:value={newQuestion.question}
                required
                rows="3"
                class="textarea variant-form-material w-full"
                placeholder="Enter the question..."
              ></textarea>
            </div>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              {#each newQuestion.options as option, index}
                <div>
                  <label for="option_{index}" class="label">
                    <span class="text-sm font-medium">Option {String.fromCharCode(65 + index)}</span
                    >
                  </label>
                  <input
                    type="text"
                    id="option_{index}"
                    name="option_{index}"
                    bind:value={newQuestion.options[index]}
                    required
                    class="input variant-form-material w-full"
                    placeholder="Enter option {String.fromCharCode(65 + index)}..."
                  />
                </div>
              {/each}
            </div>

            <div>
              <label for="correct_answer" class="label">
                <span class="text-sm font-medium">Correct Answer</span>
              </label>
              <select
                id="correct_answer"
                name="correct_answer"
                bind:value={newQuestion.correct_answer}
                class="select variant-form-material w-full"
              >
                {#each newQuestion.options as option, index}
                  <option value={index}>
                    {String.fromCharCode(65 + index)}: {newQuestion.options[index] ||
                      `Option ${String.fromCharCode(65 + index)}`}
                  </option>
                {/each}
              </select>
            </div>

            <div class="flex gap-4">
              <button type="submit" class="variant-filled-primary btn">
                {editingQuestion ? 'Update Question' : 'Add Question'}
              </button>
              <button type="button" on:click={resetForm} class="variant-ghost-surface btn">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    {/if}

    <!-- Questions List -->
    <div class="space-y-4">
      <h2 class="mb-4 text-2xl font-bold text-primary-500">All Questions</h2>

      {#each data.questions as question}
        <div class="card variant-filled-surface p-6">
          <div class="mb-4 flex items-start justify-between">
            <div class="flex-1">
              <h3 class="mb-2 text-lg font-semibold">
                Question #{question.id}: {question.question}
              </h3>

              <div class="mb-4 grid grid-cols-1 gap-2 md:grid-cols-2">
                {#each JSON.parse(question.options) as option, optionIndex}
                  <div class="flex items-center gap-2">
                    <span
                      class="badge {optionIndex === question.correct_answer
                        ? 'variant-filled-success'
                        : 'variant-soft-surface'}"
                    >
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    <span
                      class={optionIndex === question.correct_answer
                        ? 'font-semibold text-success-500'
                        : ''}
                    >
                      {option}
                    </span>
                    {#if optionIndex === question.correct_answer}
                      <span class="text-success-500">✓</span>
                    {/if}
                  </div>
                {/each}
              </div>

              <p class="text-surface-600-300-token text-sm">
                Correct Answer: {String.fromCharCode(65 + question.correct_answer)}
              </p>
            </div>

            <div class="ml-4 flex gap-2">
              <button
                on:click={() => editQuestion(question)}
                class="variant-ghost-primary btn btn-sm"
              >
                Edit
              </button>

              <form method="POST" action="?/delete" use:enhance>
                <input type="hidden" name="id" value={question.id} />
                <button
                  type="submit"
                  class="variant-ghost-error btn btn-sm"
                  on:click={(e) => {
                    if (!confirm('Are you sure you want to delete this question?')) {
                      e.preventDefault();
                    }
                  }}
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      {/each}

      {#if data.questions.length === 0}
        <div class="py-12 text-center">
          <p class="text-surface-600-300-token text-lg">
            No questions found. Add some questions to get started!
          </p>
        </div>
      {/if}
    </div>
  </div>
</div>
