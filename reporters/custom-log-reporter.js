const fs = require('fs');
const path = require('path');

/**
 * Custom Reporter สำหรับ Playwright
 * เขียนด้วย JavaScript ธรรมดา
 */
class CustomLogReporter {
  constructor(options = {}) {
    this.outputFile = options.outputFile || 'test-results/test-log.txt';
    this.logs = [];
    this.startTime = null;
  }

  /**
   * เรียกเมื่อเริ่ม test run
   */
  onBegin(config, suite) {
    this.startTime = Date.now();
    const allTests = suite.allTests();
    
    this.logs.push('═'.repeat(70));
    this.logs.push('🚀 PLAYWRIGHT TEST REPORT');
    this.logs.push('═'.repeat(70));
    this.logs.push(`📅 Started: ${new Date().toLocaleString('th-TH')}`);
    this.logs.push(`📊 Total Tests: ${allTests.length}`);
    this.logs.push(`🌐 Base URL: ${config.use?.baseURL || 'Not specified'}`);
    this.logs.push('═'.repeat(70));
    this.logs.push('');
  }

  /**
   * เรียกเมื่อ test แต่ละตัวเริ่ม
   */
  onTestBegin(test) {
    const testPath = test.location.file.split('/').pop();
    this.logs.push(`▶️  [${testPath}] ${test.title}`);
  }

  /**
   * เรียกเมื่อ test แต่ละตัวจบ
   */
  onTestEnd(test, result) {
    const status = this.getStatusIcon(result.status);
    const duration = `${result.duration}ms`;
    
    this.logs.push(`   ${status} ${result.status.toUpperCase()} - ${duration}`);
    
    // แสดง error ถ้ามี
    if (result.status === 'failed' && result.error) {
      this.logs.push(`   ❌ Error: ${result.error.message}`);
      if (result.error.stack) {
        const stackLines = result.error.stack.split('\n').slice(0, 3);
        stackLines.forEach(line => {
          this.logs.push(`      ${line.trim()}`);
        });
      }
    }
    
    // แสดง retry ถ้ามี
    if (result.retry > 0) {
      this.logs.push(`   🔄 Retry attempt: ${result.retry}`);
    }
    
    this.logs.push('');
  }

  /**
   * เรียกเมื่อ test suite จบ
   */
  onEnd(result) {
    const endTime = Date.now();
    const totalDuration = ((endTime - this.startTime) / 1000).toFixed(2);
    
    this.logs.push('═'.repeat(70));
    this.logs.push('📊 TEST SUMMARY');
    this.logs.push('═'.repeat(70));
    this.logs.push(`⏱️  Total Duration: ${totalDuration}s`);
    this.logs.push(`✅ Passed: ${this.countStatus('passed')}`);
    this.logs.push(`❌ Failed: ${this.countStatus('failed')}`);
    this.logs.push(`⏭️  Skipped: ${this.countStatus('skipped')}`);
    this.logs.push(`⏸️  Timedout: ${this.countStatus('timedout')}`);
    this.logs.push(`📅 Finished: ${new Date().toLocaleString('th-TH')}`);
    this.logs.push(`🎯 Overall Status: ${result.status.toUpperCase()}`);
    this.logs.push('═'.repeat(70));
    
    // เขียนไฟล์
    this.writeLogFile();
  }

  /**
   * เขียนลงไฟล์
   */
  writeLogFile() {
    const dir = path.dirname(this.outputFile);
    
    // สร้างโฟลเดอร์ถ้ายังไม่มี
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // เขียนไฟล์
    const content = this.logs.join('\n');
    fs.writeFileSync(this.outputFile, content, 'utf-8');
    
    console.log(`\n✅ Log file saved: ${path.resolve(this.outputFile)}`);
  }

  /**
   * Helper: แปลง status เป็น icon
   */
  getStatusIcon(status) {
    const icons = {
      passed: '✅',
      failed: '❌',
      skipped: '⏭️',
      timedout: '⏸️',
    };
    return icons[status] || '❓';
  }

  /**
   * Helper: นับจำนวน test แต่ละ status
   */
  countStatus(status) {
    const regex = new RegExp(`${status.toUpperCase()}`, 'gi');
    return (this.logs.join('\n').match(regex) || []).length;
  }
}

module.exports = CustomLogReporter;