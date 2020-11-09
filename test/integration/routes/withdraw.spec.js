describe('Withdraw endpoints', () => {
  describe('GET /withdraw', () => {
    it('should return banknotes for 10080', (done) => {
      request
        .get('/api/withdraw?amount=10080')
        .expect(200)
        .end((err, res) => {
          const expected = {
            banknotes: { 100: 100, 50: 1, 20: 1, 10: 1 }
          }
          expect(res.body).to.eql(expected)
          done(err)
        })
    })

    it('should return banknotes for 20', (done) => {
      request
        .get('/api/withdraw?amount=20')
        .expect(200)
        .end((err, res) => {
          const expected = {
            banknotes: { 20: 1 }
          }
          expect(res.body).to.eql(expected)
          done(err)
        })
    })

    it('should return InvalidAmountError and 422 status', (done) => {
      request
        .get('/api/withdraw?amount=10081')
        .expect(422)
        .end((err, res) => {
          expect(res.body)
            .to.have.property('error')
            .to.have.property('message')
            .to.eql('Nós não temos cédulas para atender a requisição. Cédulas disponíveis: 100, 50, 20, 10.')
          done(err)
        })
    })

    it('should return InvalidAmountError and 400 status', (done) => {
      request
        .get('/api/withdraw')
        .expect(400)
        .end((err, res) => {
          expect(res.body)
            .to.have.property('error')
            .to.have.property('details')
          
          expect(res.body.error.details[0])
            .to.have.property('message')
            .to.eql('"amount" is required')  
          
          done(err)
        })
    })

    it('should return min value error and 400 status', (done) => {
      request
        .get('/api/withdraw?amount=0')
        .expect(400)
        .end((err, res) => {
          expect(res.body)
            .to.have.property('error')
            .to.have.property('details')
          
          expect(res.body.error.details[0])
            .to.have.property('message')
            .to.eql('"amount" must be larger than or equal to 1')  
          
          done(err)
        })
    })

    it('should return char value error and 400 status', (done) => {
      request
        .get('/api/withdraw?amount=invalid_amount')
        .expect(400)
        .end((err, res) => {
          expect(res.body)
            .to.have.property('error')
            .to.have.property('details')
          
          expect(res.body.error.details[0])
            .to.have.property('message')
            .to.eql('"amount" must be a number')  
          
          done(err)
        })
    })
  })
})
