return {
  {
    "L3MON4D3/LuaSnip",
    version = "v2.*",
    config = function(_, opts)
      require("luasnip").setup(opts)
      require("luasnip.loaders.from_lua").load({ paths = { "${HOME}/.config/nvim/snippets/" } })
      require("luasnip.loaders.from_vscode").lazy_load()
    end,
  },
  {
    "saghen/blink.cmp",
    lazy = false, -- lazy loading handled internally
    -- optional: provides snippets for the snippet source
    dependencies = {
      "rafamadriz/friendly-snippets",
      "L3MON4D3/LuaSnip",
    },

    -- use a release tag to download pre-built binaries
    version = "*",
    -- OR build from source, requires nightly: https://rust-lang.github.io/rustup/concepts/channels.html#working-with-nightly-rust
    -- build = ,
    -- If you use nix, you can build from source using latest nightly rust with:
    -- build = 'nix run .#build-plugin',

    ---@module 'blink.cmp'
    ---@diagnostic disable: missing-fields
    opts = {
      snippets = {
        expand = function(snippet)
          require("luasnip").lsp_expand(snippet)
        end,
        active = function(filter)
          if filter and filter.direction then
            return require("luasnip").jumpable(filter.direction)
          end
          return require("luasnip").in_snippet()
        end,
        jump = function(direction)
          require("luasnip").jump(direction)
        end,
        preset = "luasnip",
      },
      -- 'default' for mappings similar to built-in completion
      -- 'super-tab' for mappings similar to vscode (tab to accept, arrow keys to navigate)
      -- 'enter' for mappings similar to 'super-tab' but with 'enter' to accept
      -- see the "default configuration" section below for full documentation on how to define
      -- your own keymap.
      keymap = {
        preset = "enter",
        ["<CR>"] = { "accept", "fallback" },
        ["<C-space>"] = { "show", "show_documentation", "hide_documentation" },
        ["<C-e>"] = { "hide" },

        ["Tab"] = { "snippet_forward", "fallback" }, -- NOTE Maybe want to set this differently
        ["<S-Tab>"] = { "snippet_backward", "fallback" }, -- NOTE Maybe want to set this differently

        ["<Up>"] = { "select_prev", "fallback" },
        ["<Down>"] = { "select_next", "fallback" },
        ["<C-k>"] = { "select_prev", "fallback" },
        ["<C-j>"] = { "select_next", "fallback" },

        ["<C-u>"] = { "scroll_documentation_up", "fallback" },
        ["<C-d>"] = { "scroll_documentation_down", "fallback" },
      },

      appearance = {
        -- Sets the fallback highlight groups to nvim-cmp's highlight groups
        -- Useful for when your theme doesn't support blink.cmp
        -- will be removed in a future release
        use_nvim_cmp_as_default = true,
        -- Set to 'mono' for 'Nerd Font Mono' or 'normal' for 'Nerd Font'
        -- Adjusts spacing to ensure icons are aligned
        nerd_font_variant = "mono",
      },

      signature = {
        enabled = true,

        window = {
          border = "rounded",
        },

        trigger = {
          blocked_trigger_characters = { "," },
          blocked_retrigger_characters = { "," },
          show_on_insert_on_trigger_character = false,
        },
      },

      completion = {
        trigger = {
          show_on_insert_on_trigger_character = false,
        },

        -- Show documentation in floating window besides the completion menu
        documentation = {
          auto_show = true,
          auto_show_delay_ms = 1000,
          window = {
            border = "rounded",
          },
        },

        menu = {
          border = "rounded",
        },
      },

      -- default list of enabled providers defined so that you can extend it
      -- elsewhere in your config, without redefining it, via `opts_extend`
      sources = {
        default = { "lsp", "path", "snippets", "lazydev" },
        providers = {
          lsp = { fallbacks = { "lazydev" } },
          lazydev = { name = "LazyDev", module = "lazydev.integrations.blink" },
          cmdline = {
            min_keyword_length = 3, -- Set to 3 keywords to not enable when typing wa, xa or qa
          },
        },
        cmdline = function() -- NOTE: This is custom because I do not want to have enabled for searching. This annoyed me
          local type = vim.fn.getcmdtype()
          -- Commands
          if type == ":" then
            return { "cmdline" }
          end
          return {}
        end,
      },
    },
    -- allows extending the providers array elsewhere in your config
    -- without having to redefine it
    opts_extend = { "sources.default" },
  },
}
