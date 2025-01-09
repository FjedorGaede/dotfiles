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
        jestCommand = function(file) -- find the next jest config file below the test file
          -- local root = find_root({ "package.json" }, file)
          -- return "npm --prefix " .. root .. " exec jest " .. "--colors --run-test-by-path " .. file
          return "npm exec jest " .. "--colors --run-test-by-path " .. file
        end,
        jestConfigFile = function(file) -- find the next jest config file below the test file
          return find_files({ "jest.config.js", "jest.config.ts" }, file)[1]
        end,
        env = { CI = true },
        cwd = function(file)
          local root = find_root({ "package.json" }, file)
          return root
        end,
      })

      ---@diagnostic disable-next-line: missing-fields
      require("neotest").setup({
        adapters = {
          jest,
        },
      })
    end,
  },
}
