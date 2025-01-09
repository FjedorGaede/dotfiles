local find_files = function(root_files, path)
  return vim.fs.find(root_files, { upward = true, path = path })
end

local find_root = function(root_files, path)
  return vim.fs.dirname(find_files(root_files, path)[1])
end
return {
  {
    "nvim-neotest/neotest",
    dependencies = {
      "nvim-neotest/nvim-nio",
      "nvim-neotest/neotest-jest",
      "nvim-lua/plenary.nvim",
      "antoinemadec/FixCursorHold.nvim",
      "nvim-treesitter/nvim-treesitter",
    },
    config = function(_, opts)
      local jest = require("neotest-jest")({
        -- NOTE: This is all not needed. What? :D Ok maybe I did the same as the plugin does..
        -- cwd = function(file)
        --   -- NOTE: We set the cwd to be the root of the test not the project root.
        --   local root = find_root({ "package.json" }, file)
        --   return root
        -- end,
        -- jestCommand = function(file) -- find the next jest config file below the test file
        --   -- NOTE: This could also work if the cwd has to be the root of the project for some reason.
        --   -- local root = find_root({ "package.json" }, file)
        --   -- return "npm --prefix " .. root .. " exec jest " .. "--colors --run-test-by-path " .. file
        --   return "npm exec jest " .. "--colors --run-test-by-path " .. file
        -- end,
        -- jestConfigFile = function(file) -- find the next jest config file below the test file
        --   return find_files({ "jest.config.js", "jest.config.ts" }, file)[1]
        -- end,
        env = { CI = true, FORCE_COLOR = "1" },
      })

      local adapters = {
        jest,
      }

      local neotest = require("neotest")

      ---@diagnostic disable-next-line: missing-fields
      neotest.setup({
        adapters = adapters,
      })

      -- SET KEYMAPS --
      local set = function(keymap, command, desc)
        vim.keymap.set("n", keymap, command, { desc = desc })
      end

      set("<leader>tT", function()
        require("neotest").run.run(vim.uv.cwd())
      end, "Run Nearest Test")
      set("<leader>tt", function()
        require("neotest").run.run(vim.fn.expand("%"))
      end, "Run File (Neotest)")
      set("<leader>tr", function()
        require("neotest").run.run()
      end, "Run Nearest (Neotest)")
      set("<leader>tl", function()
        require("neotest").run.run_last()
      end, "Run Last (Neotest)")
      set("<leader>ts", function()
        require("neotest").summary.toggle()
      end, "Toggle Summary (Neotest)")
      set("<leader>to", function()
        require("neotest").output.open({ enter = true, auto_close = true })
      end, "Show Output (Neotest)")
      set("<leader>tO", function()
        require("neotest").output_panel.toggle()
      end, "Toggle Output Panel (Neotest)")
      set("<leader>tS", function()
        require("neotest").run.stop()
      end, "Stop (Neotest)")
      set("<leader>tw", function()
        require("neotest").watch.toggle(vim.fn.expand("%"))
      end, "Toggle Watch (Neotest)")
    end,
  },
}
