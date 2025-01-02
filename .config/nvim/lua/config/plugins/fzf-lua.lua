-- NOTE: The color is set by the global color scheme for FZF in the .bashrc

return {
  {
    "ibhagwan/fzf-lua",
    -- optional for icon support
    dependencies = { "nvim-tree/nvim-web-devicons" },
    -- or if using mini.icons/mini.nvim
    -- dependencies = { "echasnovski/mini.icons" },
    opts = {
      winopts = {
        height = 0.95,
        width = 0.95,
        treesitter = false, -- Default: false, What does this do?
      },

      defaults = {
        file_icons = true, -- This might make it slower but I could not see this yet
        color_icons = true, -- This might make it slower but I could not see this yet
        formatter = "path.filename_first",
        keymap = {
          fzf = {
            ["ctrl-u"] = "half-page-up",
            ["ctrl-d"] = "half-page-down",
          },
        },
      },
      ui_select = function(fzf_opts, items)
        return vim.tbl_deep_extend("force", fzf_opts, {
          prompt = " ",
          winopts = {
            title = " " .. vim.trim((fzf_opts.prompt or "Select"):gsub("%s*:%s*$", "")) .. " ",
            title_pos = "center",
          },
        }, fzf_opts.kind == "codeaction" and {
          winopts = {
            layout = "vertical",
            -- height is number of items minus 15 lines for the preview, with a max of 80% screen height
            height = math.floor(math.min(vim.o.lines * 0.8 - 16, #items + 2) + 0.5) + 16,
            width = 0.5,
            preview = not vim.tbl_isempty(LazyVim.lsp.get_clients({ bufnr = 0, name = "vtsls" })) and {
              layout = "vertical",
              vertical = "down:15,border-top",
              hidden = "hidden",
            } or {
              layout = "vertical",
              vertical = "down:15,border-top",
            },
          },
        } or {
          winopts = {
            width = 0.5,
            -- height is number of items, with a max of 80% screen height
            height = math.floor(math.min(vim.o.lines * 0.8, #items + 2) + 0.5),
          },
        })
      end,

      files = {
        prompt = "Files> ",
        cwd_prompt = false,
        actions = false, -- Disable default action. If I want to have custom actions I need to add them here.
      },
      lsp = {
        code_actions = {
          previewer = vim.fn.executable("delta") == 1 and "codeaction_native" or nil,
        },
      },
      previewers = {
        builtin = {
          extensions = {
            ["png"] = { "viu", "-b" },
            ["jpg"] = { "ueberzug" },
          },
          ueberzug_scaler = "cover",
        },
      },
    },
    config = function(_, opts)
      local fzf = require("fzf-lua")
      fzf.setup(opts)

      -- This makes fzf be the ui select for neovim
      fzf.register_ui_select()

      local set = vim.keymap.set

      -- Find Files Keymaps --
      set("n", "<leader>ff", require("fzf-lua").files, { desc = "[F]ind [F]iles" })
      set("n", "<leader>tr", require("fzf-lua").resume, { desc = "[R]esume last search" })
      set("n", "<leader>fo", require("fzf-lua").buffers, { desc = "[F]ind [O]pen Files" })
      set("n", "<leader>fr", require("fzf-lua").oldfiles, { desc = "[F]ind [R]ecent Files" })
      set("n", "<leader>fs", require("fzf-lua").live_grep_glob, { desc = "[F]ind [S]tring in Files" }) -- Note: with -- separator
      set("n", "<leader>fw", require("fzf-lua").grep_cword, { desc = "[F]ind [W]ord" })
      set("v", "<leader>fw", require("fzf-lua").grep_visual, { desc = "[F]ind [W]ord (in visual selection)" })
      set("n", "<leader>fh", require("fzf-lua").helptags, { desc = "[F]ind [H]elp" })
      set("n", "<leader>fk", require("fzf-lua").keymaps, { desc = "[F]ind [K]eymaps" })
      set("n", "<leader>fc", require("fzf-lua").commands, { desc = "[F]ind [C]ommands" })

      -- LSP Configuration -- TODO: Move somewhere else?
      set(
        "n",
        "gd",
        "<cmd>FzfLua lsp_definitions jump_to_single_result=true ignore_current_line=true<cr>",
        { desc = "[G]o to [D]efinition" }
      )
      set(
        "n",
        "gr",
        "<cmd>FzfLua lsp_references jump_to_single_result=true ignore_current_line=true<cr>",
        { desc = "[G]o to [R]eference" }
      )
      set(
        "n",
        "gy",
        "<cmd>FzfLua lsp_typedefs jump_to_single_result=true ignore_current_line=true<cr>",
        { desc = "Goto T[y]pe Definition" }
      )
      set("n", "R", vim.lsp.buf.rename, { desc = "[R]ename variable" }) -- NOTE Would be cooler if it would work in line
      set("n", "<space>ca", vim.lsp.buf.code_action, { desc = "[C]ode [A]ctions" })
      -- set("n", "<space>ca", function()
      --   return require("fzf-lua").lsp_code_actions({ winopts = { relative = "cursor", height = 0.8, width = 0.2 } })
      -- end, { desc = "[C]ode [A]ctions" })
    end,
  },
}
