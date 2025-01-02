return {
  { -- Fuzzy Finder (files, lsp, etc)
    "nvim-telescope/telescope.nvim",
    dependencies = {
      "nvim-lua/plenary.nvim",
      { "nvim-telescope/telescope-fzf-native.nvim", build = "make" },
      { "nvim-telescope/telescope-ui-select.nvim" },
    },
    config = function()
      local actions = require("telescope.actions")
      require("telescope").setup({
        pickers = {
          find_files = {
            theme = "ivy",
          },
        },
        extensions = {
          fzf = {},
          ["ui-select"] = {
            require("telescope.themes").get_cursor(),
          },
        },
        defaults = {
          file_ignore_patterns = { ".git/", ".github/", ".vscode/", "node_modules/" },
          hidden = true, -- Why does this not work for find files?
          mappings = {
            i = {
              ["<C-j>"] = actions.move_selection_next,
              ["<C-k>"] = actions.move_selection_previous,
              ["<C-l>"] = actions.cycle_history_next,
              ["<C-h>"] = actions.cycle_history_prev,
            },
          },
        },
      })

      require("telescope").load_extension("fzf")
      require("telescope").load_extension("ui-select")

      -- Keymaps
      -- Some extra args
      local show_hidden_grep = { "--hidden", "--no-ignore" }
      vim.keymap.set("n", "<space>tr", require("telescope.builtin").resume, { desc = "[T]elescope [R]esume" })
      vim.keymap.set("n", "<space>ff", function()
        return require("telescope.builtin").find_files({ hidden = true }) -- Has to set this to also find hidden files..
      end, { desc = "[F]ind [F]iles" })
      vim.keymap.set("n", "<space>fs", function()
        return require("telescope.builtin").live_grep({
          additional_args = function(args)
            return vim.list_extend(args, show_hidden_grep)
          end,
        })
      end, { desc = "[F]ind [S]trings" })
      vim.keymap.set("n", "<space>fr", require("telescope.builtin").oldfiles, { desc = "[F]ind [R]ecent Files" })
      vim.keymap.set("n", "<space>fo", require("telescope.builtin").buffers, { desc = "[F]ind [O]pen Files" })
      vim.keymap.set("n", "<space>fh", require("telescope.builtin").help_tags, { desc = "[F]ind [H]elp" })
      vim.keymap.set("n", "<space>fk", require("telescope.builtin").keymaps, { desc = "[F]ind [K]eymaps" })
      vim.keymap.set("n", "<space>fc", require("telescope.builtin").commands, { desc = "[F]ind [C]ommands" }) -- Not that useful (?)
      vim.keymap.set("n", "<space>fw", require("telescope.builtin").grep_string, { desc = "[F]ind [W]ord" }) -- Not that useful (?)
      vim.keymap.set("n", "<space>en", require("telescope.builtin").find_files, { desc = "[E]dit [N]eovim Config" })
      vim.keymap.set(
        "n",
        "<space>fd",
        require("telescope.builtin").lsp_document_symbols,
        { desc = "[F]ind [D]ocument Symbols" }
      )

      -- LSP Configurations TODO: Move into another directory? --
      vim.keymap.set("n", "<leader>D", vim.lsp.buf.type_definition, { desc = "Type [D]efinition" })
      vim.keymap.set("n", "gd", require("telescope.builtin").lsp_definitions, { desc = "[G]o to [D]efinition" })
      vim.keymap.set("n", "<leader>sh", vim.lsp.buf.signature_help, { desc = "[S]ignature [H]elp" })
      vim.keymap.set("n", "gr", require("telescope.builtin").lsp_references, { desc = "[G]o to [R]eference" })
      vim.keymap.set("n", "R", vim.lsp.buf.rename, { desc = "[R]ename variable" }) -- NOTE Would be cooler if it would work in line
      vim.keymap.set("n", "<space>ca", vim.lsp.buf.code_action, { desc = "[C]ode [A]ctions" })
    end,
  },
}